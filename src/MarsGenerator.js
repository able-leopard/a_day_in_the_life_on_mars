import React, { Component } from 'react';
import './App.css';
import MarsImage from "./MarsImage"

// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
// great stackoverflow on how to hide API key

const apiKey = process.env.REACT_APP_API_KEY
// we make an initial API call based on the a pre-set date to get photos of all three rovers from that day
// whenever the date changes, we call componentDidMount to make an new api call based on the date
// this.state.selectedRover was created to keep track of what array of photos we're using based on the rover that we selected (curosity, opportunity, spirit)

class MarsGenerator extends Component {
    constructor(){
        super()
        this.state = {
            loadingCuriosity: "",
            loadingOpportunity: "",
            loadingSpirit: "",
            allCuriosityPictures: "",
            allOpportunityPictures: "",
            allSpiritPictures: "",
            selectedRover:"",
            currentImg: "",
            currentAlbum:[], //remember to initialize this with a list if you want to map it later
            rover: "",
            dateTaken: "",
            clickedRover: "",
            dateSelected: false, // we use this when dateSelected === true then we'll show the retrieve photos button
        }
    };
    
    // had to break the DRY rule here because I can't figure out how to get Promise.all() to handle the api seperately as oppose to in a loop
    componentDidMount(){
        
        this.setState({ loadingCuriosity: true,
                        loadingOpportunity: true,
                        loadingSpirit: true,})
        
        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${this.state.dateTaken}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(response => {
            const photos = response.photos
            // console.log(response.photos)
            this.setState({
                loadingCuriosity: false,
                allCuriosityPictures: photos
            })
        })

        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${this.state.dateTaken}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(response => {
            const photos = response.photos
            this.setState({
                loadingOpportunity: false,
                allOpportunityPictures: photos
            })
        })

        fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${this.state.dateTaken}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(response => {
            const photos = response.photos
            this.setState({
                loadingSpirit: false,
                allSpiritPictures: photos
            })
        })
    }

    handleReset = () => {
        this.setState({
            dateTaken: false,
        })
    }

    // created a variable in state to capture what array we should use based on what rover we're choosing
    handleChange = (event) => {
        const{name, value, alt} = event.target
        alt !== undefined ? 
        this.setState({[name]: alt}):
        this.setState({[name]: value})
    }

    // making api call everything the date changes. Not sure if this is the most efficient way?
    handleDateChange = (event) => {
        const{name, value} = event.target
        this.setState({[name]: value})
    }

    handleDateSubmit = (event) => {
        // console.log(event.target)
        event.preventDefault()
        this.componentDidMount()
        this.setState({
            dateSelected: true,
        })
    }

    handleSubmitAll = (event) => {
        event.preventDefault()

        // based on what rover we have selected, we choose the appropriate array to perform our operations
        const photosArray = this.state.selectedRover  === "curiosity" ? this.state.allCuriosityPictures :
                            this.state.selectedRover === "opportunity" ? this.state.allOpportunityPictures :
                            this.state.allSpiritPictures
        this.setState({ 
            currentAlbum: photosArray,
        })

    }

    highlightClickRover = (clickedRover) => {
        this.setState({
            clickedRover: clickedRover.target.alt
        })
    }

    resetHighlightedRover = () => {
        this.setState({
            clickedRover: ""
        })
    }
    
    render() {  
        
        // the img < className is hardcoded. is there anyway to do this better despite the fact that the dates active must be hardcoded?
        // have to learn how to access DOM elements in react
        // for example is there anyway to access the <img> tag or <div> onclick?

        return ( 
            
            <div>
                <link 
                    rel="stylesheet" 
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" 
                    integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" 
                    crossorigin="anonymous"
                />
                <div className="steps">
                    <h4 className="step-one">Step 1: Select Date</h4>
                    <h4 className="step-two">Step 2: Choose your Rover</h4>
                    <h4 className="step-three">Step 3: Retrieve Photos</h4>
                </div>
                <div className="selection-area">
                    <div className="date-selection">
                        <h4 className="ipad-step-one">Step 1: Select Date</h4>
                        <input  type="date"
                                value={this.state.dateTaken}
                                name="dateTaken"
                                onChange={(event) => {this.handleDateChange(event); this.resetHighlightedRover()}}
                                />
                        <form onSubmit={this.handleDateSubmit}>
                            <button class="btn btn-primary"
                                    >Check for Photos</button>
                        </form>
                        <h4 className="ipad-step-two">Step 2: Choose your Rover</h4>
                    </div>
                    <br/>
                    <div className="rover-descriptions">
                        <br/>
                        <div className={(
                                            this.state.dateTaken === "" ? "": 
                                            this.state.dateTaken < "1000-05-25" ? "":
                                            this.state.dateTaken < "2012-08-06" ? "img-unavailable":
                                            this.state.dateSelected === true & this.state.allCuriosityPictures.length === 0 ? "img-unavailable":
                                            "")}>
                            <h4>Curiosity</h4>
                            <img    
                                    className={( this.state.clickedRover === "curiosity" ? "highlight-rover": "")}
                                    src={require("./Photos/curiosityRover.jpg")}
                                    alt="curiosity"
                                    name="selectedRover"
                                    onClick={(event) => {
                                        this.handleChange(event);
                                        this.highlightClickRover(event);
                                    }}
                                    />
                            <p>Landing Date: August 6, 2012</p>
                            <p>Termination Date: Still Active</p>
                            <h6>{    
                                this.state.dateSelected === false ? "" :
                                this.state.loadingCuriosity === true ? "Loading..." : 
                                this.state.allCuriosityPictures.length < 1 ? "No photos from this day" :
                                this.state.allCuriosityPictures.length + " photos"
                            }</h6>
                        </div>
                        <div className={(
                                            this.state.dateTaken === "" ? "":
                                            this.state.dateTaken < "1000-05-25" ? "":
                                            this.state.dateTaken < "2004-01-25" ? "img-unavailable":
                                            this.state.dateTaken > "2019-02-13" ? "img-unavailable":
                                            this.state.dateSelected === true & this.state.allOpportunityPictures.length === 0 ? "img-unavailable":
                                            "")}>
                            <h4>Opportunity</h4>
                            <img    
                                    className={( this.state.clickedRover === "opportunity" ? "highlight-rover": "")}
                                    src={require("./Photos/opportunityRover.jpg")}
                                    alt="opportunity"
                                    name="selectedRover"
                                    onClick={(event) => {
                                        this.handleChange(event);
                                        this.highlightClickRover(event);
                                    }}
                                    />
                            <p>Landing Date: January 25, 2004</p>
                            <p>Termination Date: February 13, 2019</p>
                            <h6>{    
                                this.state.dateSelected === false ? "" :
                                this.state.loadingOpportunity === true ? "Loading..." : 
                                this.state.allOpportunityPictures.length < 1 ? "No photos from this day" :
                                this.state.allOpportunityPictures.length + " photos"
                            } </h6>
                        </div>
                        <div className={(
                                            this.state.dateTaken === "" ? "": 
                                            this.state.dateTaken < "1000-05-25" ? "":
                                            this.state.dateTaken < "2004-01-04" ? "img-unavailable":
                                            this.state.dateTaken > "2011-05-25" ? "img-unavailable":
                                            this.state.dateSelected === true & this.state.allSpiritPictures.length === 0 ? "img-unavailable":
                                            "")}>
                            <h4>Spirit</h4>
                            <img    
                                    className={( this.state.clickedRover === "spirit" ? "highlight-rover": "")}
                                    src={require("./Photos/spiritRover.jpg")}
                                    alt="spirit"
                                    name="selectedRover"
                                    onClick={(event) => {
                                        this.handleChange(event);
                                        this.highlightClickRover(event);
                                    }}
                                    />
                            <p>Landing Date: January 4, 2004</p>
                            <p>Termination Date: May 25, 2011</p>
                            <h6>{
                                this.state.dateSelected === false ? "" :
                                this.state.loadingSpirit === true ? "Loading..." :
                                this.state.allSpiritPictures.length < 1 ? "No photos from this day" :
                                this.state.allSpiritPictures.length + " photos"
                            }</h6>
                        </div>
                    </div>
                    <div className="retrieve-photos">
                        <h4 className="ipad-step-three">Step 3: Retrieve Photos</h4>                        
                        <form onSubmit={this.handleSubmitAll}>
                            <button class="btn btn-primary"
                                    hidden={!this.state.dateSelected}>Retrieve Photos</button>
                        </form>
                    </div>
                </div>  

                
                <br/>

                {/* this is the image gallery section*/}
                <div className="loaded-photos">
                    <MarsImage  currentAlbum={this.state.currentAlbum}/>
                </div>

            </div>
            
        );
    }
}   

export default MarsGenerator;