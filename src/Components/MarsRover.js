import React, { Component } from 'react';
import '../App.css';
import IMAGES from '../Assets/imageFiles'



class MarsRover extends Component {

    render() { 

        // good stackoverflow on how to update parent's state in child component: https://stackoverflow.com/questions/35537229/how-to-update-parents-state-in-react

        const {dateTaken, dateSelected, clickedRover, loadingCuriosity, loadingOpportunity, loadingSpirit, allCuriosityPictures, allOpportunityPictures, allSpiritPictures,
                highlightClickRover, handleChange} = this.props

        console.log(this.props)

        return ( 
            <div className="rover-descriptions"> 
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
                    src={require('../Assets/'+IMAGES.curiosityRover)}
                    alt="curiosity"
                    name="selectedRover"
                    onClick={event => {
                    handleChange(event);
                    highlightClickRover(event);
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
                    src={require('../Assets/'+IMAGES.opportunityRover)}
                    alt="opportunity"
                    name="selectedRover"
                    onClick={event => {
                    handleChange(event);
                    highlightClickRover(event);
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
                    src={require('../Assets/'+IMAGES.spiritRover)}
                    alt="spirit"
                    name="selectedRover"
                    onClick={event => {
                    handleChange(event);
                    highlightClickRover(event);
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

         );
    }
}
 
export default MarsRover;