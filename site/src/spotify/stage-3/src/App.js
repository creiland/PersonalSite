import React, { Component } from 'react';
import './style.css';
import FontAwesome from 'react-fontawesome'
import _ from 'lodash';
import { Cards as Card, Cards } from './components/Cards';
import firebase from 'firebase/app';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Footer from './components/footer';
import NavBar from './components/NavBar';
import Home from './components/Home';
import PlaylistOptions from './components/PlaylistOptions';
import ShowPlaylists from './components/ShowPlaylists';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            spotifyUser: '',
            firebaseUser: null,
            loggedIn: false,
            fbLoggedIn: false,
            errorMessage: '',
            tempUser: {},
            isLoading: true
        };
        this.loginUser = this.loginUser.bind(this);
    }

    fbLoginCheck = () => {
        this.setState({ fbLoggedIn: true });
    }

    updateFirebaseUser = (user) => {
        this.setState({ firebaseUser: user })
    }

    //performs spotify authentication and returns auth token
    login = () => {
        const hash = window.location.hash
            .substring(1)
            .split('&')
            .reduce((initial, item) => {
                if (item) {
                    var parts = item.split('=');
                    initial[parts[0]] = decodeURIComponent(parts[1]);
                }
                return initial;
            }, {});
        window.location.hash = '';

        // Set token
        let _token = hash.access_token;
        localStorage.setItem('token', _token);
        const authEndpoint = 'https://accounts.spotify.com/authorize';

        //github redirect
        let gh = 'https://info340c-au18.github.io/stage-0-topic-proposal-creiland/';

        //localhost redirect
        let lh = 'http://localhost:3000/';

        // Replace with your app's client ID, redirect URI and desired scopes
        const clientId = '92862003d4af472994d471f9cb5695fd';
        const redirectUri = lh;
        const scopes = [
            'user-read-private',
            'user-read-email',
            'playlist-modify-public',
            'playlist-modify-private',
            'user-top-read'
        ];

        // If there is no token, redirect to Spotify authorization
        if (!_token) {
            window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
        } else {
            this.setState({ token: _token });
            return _token;
        }
    }

    //gets the users top artists and stores in state for later use in search algorithm
    //will be reimplemented in future versions
    getUserTopArtists = (user) => {
        var topArtists = [];
        fetch("https://api.spotify.com/v1/me/top/artists?limit=25", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        }).then((response) => response.json())
            .then((data) => {
                data.items.map((artist) => {
                    topArtists.push(artist.id);
                })
                return topArtists;
            }).then((topArtists) => {
                this.setState({ topArtists: topArtists });
                this.getUserData(user);
            })
        return user;
    }

    //gets the users top tracks and stores in state for later use in search algorithm
    //will be reimplemented in  future versions
    getUserTopTracks = (user) => {
        var topTracks = [];
        fetch("https://api.spotify.com/v1/me/top/tracks?limit=25", {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + this.state.token }
        }).then((response) => response.json())
            .then((data) => {
                data.items.map((track) => {
                    topTracks.push(track.id);
                })
            }).then((topTracks) => {
                this.setState({ topTracks: topTracks });
                this.getUserTopArtists(user);
            })
        return user;
    }

    //handles user login as well as updating state
    loginUser = () => {
        let tk = this.login();
        this.setState({ token: tk });
        this.getCurrentUser(tk);
        this.setState({ loggedIn: true });
        return this.state.spotifyUser;
    }

    //updates state with information for the signed in user
    getUserData = (data) => {
        let dp;
        if (typeof data.images[0] == 'undefined')
        {
            dp = 'http://zebconference.com/wp-content/uploads/2018/07/Blank-Person-Image.png';
        }
        else
        {
            dp = data.images[0].url;
        }
        
           let newSpotifyUser = ({
                username: data.display_name,
                profileImg: dp,
                id: data.id,
                uri: data.uri,
                href: data.href,
                type: data.product,
                topTracks: this.state.topTracks,
                topArtists: this.state.topArtists,
            });
            this.setState({spotifyUser: newSpotifyUser});
            if (data.product != "premium")
            {
                var redirect = window.confirm('Please upgrade to premium to continue');
                
                if (redirect) {
                    window.location.href = 'https://www.spotify.com/us/premium/?checkout=false';
                }else{
                    window.location.href = 'https://www.spotify.com/us/premium/?checkout=false';
                }
                if(alert("Please upgrade to premium to continue"))
                {
                    window.location.href = 'https://www.spotify.com/us/premium/?checkout=false';
                }
                window.location.href = 'https://www.spotify.com/us/premium/?checkout=false';
            }
            console.log(data.product);
        }

    firebaseSpotify = () => {
        this.authUnregFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
            if (firebaseUser) {
                this.setState({ firebaseUser: firebaseUser });
                let uid = this.state.firebaseUser.uid;
                let user = this.state.spotifyUser;
                var usersRef = firebase.database().ref("spotifyUsers").child(uid);
                usersRef.set({ user });
            }
            else {
                this.setState({ firebaseUser: null });
            }
        })
    }

    //get current user id (sorry for how disgustingly hacky this is)
    getCurrentUser = (token) => {
        fetch("https://api.spotify.com/v1/me", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ tempUser: responseJson })
                var topTracks = [];
                fetch("https://api.spotify.com/v1/me/top/tracks?limit=25", {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + this.state.token }
                }).then((response) => response.json())
                    .then((data) => {
                        data.items.map((track) => {
                            topTracks.push(track.id);
                        })
                        return topTracks;
                    }).then((topTracks) => {
                        this.setState({ topTracks: topTracks });
                        var topArtists = [];
                        fetch("https://api.spotify.com/v1/me/top/artists?limit=25", {
                            method: 'GET',
                            headers: { 'Authorization': 'Bearer ' + this.state.token }
                        }).then((response) => response.json())
                            .then((data) => {
                                data.items.map((artist) => {
                                    topArtists.push(artist.id);
                                })
                                return topArtists;
                            }).then((topArtists) => {
                                this.setState({ topArtists: topArtists });
                                this.getUserData(this.state.tempUser);
                                this.firebaseSpotify();
                            })
                    })

            })

    }

    componentDidMount() {
        this.setState({ isLoading: false })
    }


    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <div className="logo">
                    </div>
                    <div className="preload-title">
                        Hold on, it's loading!
                    </div>
                </div>
            )
        }
        return (
            <div className='main-container'>
                <NavBar loginClicked={this.loginUser} loggedIn={this.state.loggedIn} user={this.state.spotifyUser} />
                <Switch>
                    <Route exact path='/' render={(routerProps) => (
                        <Home {...routerProps} spotifyLoggedIn={this.state.loggedIn} user={this.state.spotifyUser} fbLoggedIn={this.state.fbLoggedIn} checkLogin={this.fbLoginCheck} updateFirebaseUser={this.updateFirebaseUser} loginClicked={this.loginUser} />
                    )} />
                    <Route path='/NewPlaylist' render={(routerProps) => (
                        <PlaylistOptions {...routerProps} user={this.state.spotifyUser} token={this.state.token} topArtists={this.state.artists} topTracks={this.state.tracks} />
                    )} />
                    <Route path='/ShowPlaylists' render={(routerProps) => (
                        <ShowPlaylists {...routerProps} currentUser={this.state.spotifyUser} token={this.state.token} />
                    )} />
                    <Redirect to='/' />
                </Switch>
                <Footer />
            </div>
        )
    }
}

export default App;