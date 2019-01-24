import React, { Component } from 'react';
import firebase from 'firebase/app';
import {Link} from 'react-router-dom';

class NavBarProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            photoURL: '',
            displayName: ''
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              let path = 'spotifyUsers/' + user.uid + '/user/';
              let photoRef = firebase.database().ref(path + 'profileImg');
              let nameRef = firebase.database().ref(path).child('username');
              // set profile photo
              photoRef.once('value', (snapshot) => {
                let photo = snapshot.val();
                this.setState({photoURL:photo});
              });

              //set displayName
              nameRef.once('value', (snapshot) => {
                let name = snapshot.val();
                this.setState({displayName:name});
              });
            }
          });
    }
    
    render(){
        return(
        <Link to='/ShowPlaylists'>
            <div className='top-right'>
                <div className="logged-in" id='profile-nav-bar'>
                    <img className = "profile-img" id='profile-img' src={this.state.photoURL} alt="profile"/>
                    <h2 id='profile-name'>{this.state.displayName}</h2>
                </div>
            </div>
        </Link>
        )
    }
}

export default NavBarProfile;