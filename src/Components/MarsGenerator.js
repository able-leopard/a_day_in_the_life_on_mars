import React, { Component } from 'react';
import '../App.css';
import MarsImage from './MarsImage';

// https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
// great stackoverflow on how to hide API key

// getting api get from environment variables
const apiKey = process.env.REACT_APP_API_KEY;

// we make an initial API call based on the a pre-set date to get photos of all three rovers from that day
// whenever the date changes, we call componentDidMount to make an new api call based on the date
// this.state.selectedRover was created to keep track of what array of photos we're using based on the rover that we selected (curosity, opportunity, spirit)

class MarsGenerator extends Component {
  constructor() {
    super();
    this.state = {
      loadingCuriosity: '',
      loadingOpportunity: '',
      loadingSpirit: '',
      allCuriosityPictures: '',
      allOpportunityPictures: '',
      allSpiritPictures: '',
      selectedRover: '',
      currentImg: '',
      currentAlbum: [], // remember to initialize this with a list if you want to map it later
      rover: '',
      dateTaken: '',
      clickedRover: '',
      dateSelected: false, // we use this when dateSelected === true then we'll show the retrieve photos button
      dateError: "",
    };
  }

  // had to break the DRY rule here because I can't figure out how to get Promise.all() to handle the api seperately as oppose to in a loop
  componentDidMount() {
    this.setState({
      loadingCuriosity: true,
      loadingOpportunity: true,
      loadingSpirit: true,
    });

    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${this.state.dateTaken}&api_key=${apiKey}`
    )
      .then(response => response.json())
      .then(response => {
        const { photos } = response;
        // console.log(response.photos)
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

  // created a variable in state to capture what array we should use based on what rover we're choosing
  handleChange = event => {
    const { name, value, alt } = event.target;
    alt !== undefined
      ? this.setState({ [name]: alt })
      : this.setState({ [name]: value });
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
    
    console.log(event.target)
    console.log(this.dateValue.value)
    
    const enteredDate = this.dateValue.value
    this.isValidDate(enteredDate)
    
    event.preventDefault();
    this.componentDidMount();
    this.setState({
      dateSelected: true,
    });
  };

  handleSubmitAll = event => {
    event.preventDefault();

    // based on what rover we have selected, we choose the appropriate array to perform our operations
    const photosArray =
      this.state.selectedRover === 'curiosity'
        ? this.state.allCuriosityPictures
        : this.state.selectedRover === 'opportunity'
        ? this.state.allOpportunityPictures
        : this.state.allSpiritPictures;
    this.setState({
      currentAlbum: photosArray,
    });
  };

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

  

  render() {
    // the img < className is hardcoded. is there anyway to do this better despite the fact that the dates active must be hardcoded?
    
    const {loadingCuriosity, 
          loadingOpportunity,
          loadingSpirit,
          allCuriosityPictures,
          allOpportunityPictures,
          allSpiritPictures,
          selectedRover,
          currentImg,
          currentAlbum,
          rover,
          dateTaken,
          clickedRover,
          dateSelected,
          dateError} = this.state;

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
          <div className="rover-descriptions">
            <br />
            <div
              className={
                dateTaken === ''
                  ? ''
                  : dateTaken < '1000-05-25'
                  ? ''
                  : dateTaken < '2012-08-06'
                  ? 'img-unavailable'
                  : (dateSelected === true) &
                    (allCuriosityPictures.length === 0)
                  ? 'img-unavailable'
                  : ''
              }
            >
              <h4>Curiosity</h4>
              <img
                className={
                  clickedRover === 'curiosity'
                    ? 'highlight-rover'
                    : ''
                }
                src={require('../Assets/curiosityRover.jpg')}
                alt="curiosity"
                name="selectedRover"
                onClick={event => {
                  this.handleChange(event);
                  this.highlightClickRover(event);
                }}
              />
              <p>Landing Date: August 6, 2012</p>
              <p>Termination Date: Still Active</p>
              <h6>
                {dateSelected === false
                  ? ''
                  : loadingCuriosity === true
                  ? 'Loading...'
                  : allCuriosityPictures.length < 1
                  ? 'No photos from this day'
                  : `${allCuriosityPictures.length} photos`}
              </h6>
            </div>
            <div
              className={
                dateTaken === ''
                  ? ''
                  : dateTaken < '1000-05-25'
                  ? ''
                  : dateTaken < '2004-01-25'
                  ? 'img-unavailable'
                  : dateTaken > '2019-02-13'
                  ? 'img-unavailable'
                  : (dateSelected === true) &
                    (allOpportunityPictures.length === 0)
                  ? 'img-unavailable'
                  : ''
              }
            >
              <h4>Opportunity</h4>
              <img
                className={
                  clickedRover === 'opportunity'
                    ? 'highlight-rover'
                    : ''
                }
                src={require('../Assets/opportunityRover.jpg')}
                alt="opportunity"
                name="selectedRover"
                onClick={event => {
                  this.handleChange(event);
                  this.highlightClickRover(event);
                }}
              />
              <p>Landing Date: January 25, 2004</p>
              <p>Termination Date: February 13, 2019</p>
              <h6>
                {dateSelected === false
                  ? ''
                  : loadingOpportunity === true
                  ? 'Loading...'
                  : allOpportunityPictures.length < 1
                  ? 'No photos from this day'
                  : `${allOpportunityPictures.length} photos`}{' '}
              </h6>
            </div>
            <div
              className={
                dateTaken === ''
                  ? ''
                  : dateTaken < '1000-05-25'
                  ? ''
                  : dateTaken < '2004-01-04'
                  ? 'img-unavailable'
                  : dateTaken > '2011-05-25'
                  ? 'img-unavailable'
                  : (dateSelected === true) &
                    (allSpiritPictures.length === 0)
                  ? 'img-unavailable'
                  : ''
              }
            >
              <h4>Spirit</h4>
              <img
                className={
                  clickedRover === 'spirit' ? 'highlight-rover' : ''
                }
                src={require('../Assets/spiritRover.jpg')}
                alt="spirit"
                name="selectedRover"
                onClick={event => {
                  this.handleChange(event);
                  this.highlightClickRover(event);
                }}
              />
              <p>Landing Date: January 4, 2004</p>
              <p>Termination Date: May 25, 2011</p>
              <h6>
                {dateSelected === false
                  ? ''
                  : loadingSpirit === true
                  ? 'Loading...'
                  : allSpiritPictures.length < 1
                  ? 'No photos from this day'
                  : `${allSpiritPictures.length} photos`}
              </h6>
            </div>
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
