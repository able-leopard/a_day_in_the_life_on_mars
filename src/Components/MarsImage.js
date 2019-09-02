import React, { Component } from 'react';

import '../App.css';
import '../Small.css';


// trying to get dimension of images
// https://jsbin.com/dudurunepu/1/edit?js,output
// https://stackoverflow.com/questions/39092859/get-dimensions-of-image-with-react

// how to make one specific item change class while keeping the rest of the items at default class
// code example: https://jsfiddle.net/69z2wepo/113099/
// Stackoverflow: https://stackoverflow.com/questions/48944971/react-js-change-color-on-click-and-put-defaul-color-on-all-other-ones

const ImagePreview = props => (
  <div className={props.clicked ? 'overlay' : 'item'}>
    <img onLoad={props.onImgLoad} src={props.src} />
    <div className={props.clicked ? 'overlay' : 'item__overlay'}>
      {// if clicked display the Close button, otherwise display View buttion for all
      props.clicked ? (
        [
          <button
            className="close-button"
            onClick={props.clickReset}
            onKeyDown={props.escFunction}
          >
            × Close
          </button>,
          <button className="next-button" onClick={props.getNextPhoto}>
            Next →
          </button>,
          <button className="prev-button" onClick={props.getPrevPhoto}>
            ← Prev
          </button>,
          <br />,
          <h4>
            {' '}
            Photo {props.index + 1} of {props.albumLength}
          </h4>,
        ]
      ) : (
        <button onClick={props.clickExpandImage}>
          View → {props.index + 1} of {props.albumLength}
        </button>
      )}
    </div>
  </div>
);

// this takes in the currentAlbum as props and loads the gallery, also responsible for expanding and closing the images
class MarsImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dimensions: {},
      clickedImage: '',
      initialRender: false,
      containsImage: "",
    };
  }

  // this expands the image
  clickExpandImage = clickedImage => {
    this.setState({
      clickedImage,
    });
  };

  // this collapes the image
  clickReset = () => {
    this.setState({
      clickedImage: '',
    });
  };

  getNextPhoto = (allPhotos, index) => {
    this.setState({
      clickedImage: allPhotos[index + 1],
    });
  };

  getPrevPhoto = (allPhotos, index) => {
    this.setState({
      clickedImage: allPhotos[index - 1],
    });
  };

  // enables the esc key to close image
  escFunction = event => {
    event.keyCode === 27 ? this.clickReset() : '';
  };

  // this is not actually needed but I just wanted to get the width and length of the images as it was loaded
  onImgLoad = ({ target: img }) => {
    this.setState({
      dimensions: { height: img.offsetHeight, width: img.offsetWidth },
    });
  };

  render() {

    this.props.currentAlbum === null || undefined ? this.setState({
      containsImage: "please select rover with images"
    }) : ""

    const myAlbum = this.props.currentAlbum

    return (
      <div>

        <section className="gallery">
          {myAlbum.map((image, index) => (
            <ImagePreview
              key={image.id}
              clicked={image === this.state.clickedImage}
              clickExpandImage={() => {
                this.clickExpandImage(image);
              }}
              clickReset={this.clickReset}
              getNextPhoto={() => {
                this.getNextPhoto(myAlbum, index);
              }}
              getPrevPhoto={() => {
                this.getPrevPhoto(myAlbum, index);
              }}
              src={image.img_src}
              onImgLoad={this.onImgLoad}
              escFunction={this.escFunction}
              albumLength={myAlbum.length}
              index={index}
              allPhotos={myAlbum}
            />
          ))}
          
        </section>
        <div>
          {this.state.containsImage}
        </div>    
      </div>
    );
  }
}

export default MarsImage;
