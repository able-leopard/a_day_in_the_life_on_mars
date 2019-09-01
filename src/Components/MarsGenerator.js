import React, { Component } from 'react';
import '../App.css';
import MarsImage from './MarsImage';
import MarsRover from './MarsRover';

// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
// great stackoverflow on how to hide API key

// getting api get from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

// we make an initial API call based on the a pre-set date to get photos of all three rovers from that day
// whenever the date changes, we call componentDidMount to make an new api call based on the date

// we need to make the API call after selecting the date and BEFORE selecting the rover because we want to display ahead of hand how many photos each rover took that day
// of course if we didn't need that it would be more efficient to run componentDidMount after selecting the rover so we don't need to fetch 3 times

class MarsGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingCuriosity: true,
      loadingOpportunity: true,
      loadingSpirit: true,
      allCuriosityPictures: '',
      allOpportunityPictures: '',
      allSpiritPictures: '',
      selectedRover: '', // this is to keep track of what array of photos we're using based on the rover that we selected (curosity, opportunity, spirit)
      currentImg: '',
      currentAlbum: [], // remember to initialize this as a empty list because we want to eventually load the array of photos into this
      dateTaken: '',
      dateSelected: false, // we use this when dateSelected === true then we'll show the retrieve photos button
      dateError: "",
    };
  }


  // had to break the DRY rule here because I can't figure out how to get Promise.all() to handle the api seperately as oppose to in a loop
  componentDidMount() {
  
    
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${this.state.dateTaken}&api_key=${apiKey}`
    )
      .then(response => response.json())
      .then(response => {
        const { photos } = response;
        this.setState({
          loadingCuriosity: false,
          allCuriosityPictures: photos,
        });
      });

    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${this.state.dateTaken}&api_key=${apiKey}`
    )
      .then(response => response.json())
      .then(response => {
        const { photos } = response;
        this.setState({
          loadingOpportunity: false,
          allOpportunityPictures: photos,
        });
      });

    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${this.state.dateTaken}&api_key=${apiKey}`
    )
      .then(response => response.json())
      .then(response => {
        const { photos } = response;
        this.setState({
          loadingSpirit: false,
          allSpiritPictures: photos,
        });
      });
  }

  handleReset = () => {
    this.setState({
      dateTaken: false,
    });
  };

  isValidDate = (dateString) => {
    
    let parts = dateString.split("-");
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    (year < 1800 || year > 2500 || month === 0 || month > 12) ?
      this.setState({
        dateError: "Please input a valid date"
      }) :
      this.setState({
        dateError: ""
      })
    }

  handleDateChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDateSubmit = event => {
     
    const enteredDate = this.dateValue.value
    this.isValidDate(enteredDate)
    
    event.preventDefault();
    this.componentDidMount(); // whenever the date changes, we call componentDidMount to make an new api call based on the date
    this.setState({
      dateSelected: true,
    });
  };

  handleSubmitAll = event => {
    event.preventDefault();

    const myRover = this.state.selectedRover
    switch(myRover){
      case "curiosity":
        this.setState({
          currentAlbum: this.state.allCuriosityPictures
          });
        break;
      case "opportunity":
        this.setState({
          currentAlbum: this.state.allOpportunityPictures
          });
        break;
      case "spirit":
        this.setState({
          currentAlbum: this.state.allSpiritPictures
          });
        break;
      }
    }
  
  highlightClickRover = clickedRover => {
      this.setState({
        clickedRover: clickedRover.target.alt,
      });
  };


  resetHighlightedRover = () => {
    this.setState({
      clickedRover: '',
    });
  };

  // created a variable in state to capture what array we should use based on what rover we're choosing
  handleChange = event => {
    const { name, value, alt } = event.target;
    alt !== undefined
    ? this.setState({ [name]: alt })
    : this.setState({ [name]: value });
  };

  render() {
    // the img < className is hardcoded. is there anyway to do this better despite the fact that the dates active must be hardcoded?
    
    const {loadingCuriosity, loadingOpportunity, loadingSpirit, allCuriosityPictures, allOpportunityPictures, allSpiritPictures, selectedRover,
          currentImg, currentAlbum, dateTaken, clickedRover, dateSelected, dateError} = this.state;

    console.log(this.state.clickedRover)

    return (
      <div>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
          integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
          crossOrigin="anonymous"
        />
        <div className="steps">
          <h4 className="step-one">Step 1: Select Date</h4>
          <h4 className="step-two">Step 2: Choose your Rover</h4>
          <h4 className="step-three">Step 3: Retrieve Photos</h4>
        </div>
        <div className="selection-area">
          <div className="date-selection">
            <h4 className="ipad-step-one">Step 1: Select Date</h4>
            <form onSubmit={this.handleDateSubmit}>
              <input
              type="date"
              value={dateTaken}
              ref={el => this.dateValue=el} // good stackoverflow on how to get input value in react https://stackoverflow.com/questions/44586214/correct-way-to-take-input-values-in-react-js
              name="dateTaken"
              onChange={event => {
                this.handleDateChange(event);
                this.resetHighlightedRover();
              }}
              />
              <div>{dateError}</div>
              <button className="btn btn-primary">Check for Photos</button>
            </form>
            <h4 className="ipad-step-two">Step 2: Choose your Rover</h4>
          </div>
          <br />

          {/* this is the mars rover section */}
          <div>
            <MarsRover dateSelected={dateSelected} dateTaken={dateTaken} clickedRover={clickedRover} loadingCuriosity={loadingCuriosity} loadingOpportunity={loadingOpportunity}
                      loadingSpirit={loadingSpirit} allCuriosityPictures={allCuriosityPictures} allOpportunityPictures={allOpportunityPictures} allSpiritPictures={allSpiritPictures} 
                      highlightClickRover={this.highlightClickRover} handleChange={this.handleChange}
                      />
          </div>

          <div className="retrieve-photos">
            <h4 className="ipad-step-three">Step 3: Retrieve Photos</h4>
            <form onSubmit={this.handleSubmitAll}>
              <button
                className="btn btn-primary"
                hidden={!dateSelected}
              >
                Retrieve Photos
              </button>
            </form>
          </div>
        </div>

        <br />

        {/* this is the image gallery section */}
        <div className="loaded-photos">
          <MarsImage currentAlbum={currentAlbum} />
        </div>
      </div>
    );
  }
}

export default MarsGenerator;
