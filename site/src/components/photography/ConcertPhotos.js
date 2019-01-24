import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app'

class ConcertPhotos extends Component{
    constructor(props) {
        super(props);

        this.state = {
            file: null,
        }
    }

      componentDidMount(){
        let current = this;
        var storage = firebase.storage();
        var storageRef = storage.ref();
        storageRef.child('46678460572_87162d20b3_o.jpg').getDownloadURL().then(function(url) {
            var test = url;
            current.setState({file: test})
            console.log("Success")
        }).catch(function(error) {
            console.log(error)
        });
      }

    render() {
        return (
            <div className="res">
                <img src={this.state.file}></img>
            </div>
        )
    }
}

export default ConcertPhotos;