import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SignUp from './SignUp'
import SpotifySignIn from './SpotifySignIn';
import NavBar from './NavBar';
import firebase from 'firebase/app';

class Home extends Component{

    constructor(props){
        super(props);
        this.state = {loggedIn:false}
    }

    //checks firebase login
    componentDidMount(){
        const hash = window.location.hash
        .substring(1)
        .split('&')
        .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
        }, {});
        let _token = hash.access_token;
        if (_token) {
            this.setState({loggedIn:true})
            this.props.loginClicked();
        }
        if(this.props.spotifyLoggedIn){
            this.setState({loggedIn: true})
        }
        this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
          if(firebaseUser){
            this.props.updateFirebaseUser(firebaseUser);
            this.props.checkLogin();
          }
        })
      }

      componentWillUnmount(){
        this.authUnregFunc();
      }

    render(){
        let content = null;
        //if user is not logged in
        if(!this.props.fbLoggedIn){
            content = <SignUp/>;
        }else if (!this.state.loggedIn){
            content = <SpotifySignIn loginClicked={this.props.loginClicked}/>;
        } else{
            content = <HomeButtons/>;
        }
        return (
            <main className="home-main">
                    {content}
            </main>
        )
    }
}

class HomeButtons extends Component{
    render(){
        return(
            <main className="home-main">
                    <div className="flexgrid">
                        <header className="desc" id="home-header">
                        <h1>Generate a new playlist or listen to your old favorites.</h1>
                        </header>
                        <Link className="btn-new" to='/NewPlaylist' aria-label="new playlist">
                            <div className="btn-filled">
                            New Playlist
                            </div>
                        </Link>
                        <Link className="btn-your" to='/ShowPlaylists' aria-label="new playlist">
                            <div className="btn-outline">
                            See My Playlists
                            </div>
                        </Link>
                    </div>
                </main>
        )
    }
}

export default Home;