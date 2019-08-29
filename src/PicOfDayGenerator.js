import React, { Component } from 'react';

class PicOfDayGenerator extends Component {
    constructor(){
        super()
        this.state = {
            loading: false,
            currentPhoto: "",
            date: "",
        }
    };

    componentDidMount(){
        this.setState({loading: true})
        fetch("https://api.nasa.gov/planetary/apod?date=2019-08-01&api_key=lk2E7XSULaqDRRlqfymjRgLGU3RSukzqlh3REvB9")
        .then(response => response.json())
        .then(response => {
            const {photos} = response
            console.log(response)
            this.setState({
                loading: false,
                allPictures: photos
            })
        })  
    }

    render() { 
        return ( 
            <div>
                
                    Hello
            
            </div>
            
        );
    }
}
 
export default PicOfDayGenerator;