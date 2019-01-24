import _ from 'lodash';
import {Cards} from './Cards';
import Popup from "reactjs-popup";
import React, { Component } from 'react';
import firebase from 'firebase/app';

class Generate extends Component{
    constructor(){
        super();
        this.handleClick=this.handleClick.bind(this);
        this.newPlaylist=this.newPlaylist.bind(this);
        this.addTracks=this.addTracks.bind(this);
        this.state = {
            generated: false,
            userId: '',
            firebaseID: null,
            userArtists: [],
            userTracks: [],
        }
    }

    //creates a new playlist and adds it to the users profile
    newPlaylist = () =>{
        fetch('https://api.spotify.com/v1/users/' + this.state.userId + '/playlists',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({name: this.props.playlistName, public: true}),
         }).then((response) => response.json())
         .then((data) =>{
             this.setState({playlistID: data.id})
         })
    }

    //gets parameters for search algorithm based on user's dropdown selection
    getPlaylistParams = () =>{
        var mood = this.props.mood;
        var valenceMin = 0;
        var valenceMax = 1;
        var danceMin = 0;
        if(mood === "Happy"){
            valenceMin=0.6;
        }else if(mood === 'Sad'){
            valenceMax=0.4;
        }else if(mood === 'Excited'){
            valenceMin=0.5;
            danceMin=0.5;
        }
        var params="min_valence=" + valenceMin + "&max_valence=" + valenceMax + "&min_danceability=" + danceMin;
        return params;
    }

    //adds tracks to the created playlist based on search params
    addTracks = (playlistID, seedArtists, seedTracks) =>{
        var tracksToAdd = [];
        var parameters = this.getPlaylistParams();
            fetch('https://api.spotify.com/v1/recommendations?market=US&seed_artists=' + seedArtists + '&seed_tracks='+ seedTracks + '&' + parameters, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.props.token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                    },
            }).then((response) => response.json())
            .then((data) => {data.tracks.map((track) => {
                tracksToAdd.push(track);
                })
                return tracksToAdd;
            })
            .then((tracks) => {
                let trackUris = tracks.map((track) => {
                    return track.uri;
                })
                fetch('https://api.spotify.com/v1/users/' + this.props.user.id + '/playlists/' + playlistID + '/tracks?uris=' + trackUris, {
                    method: 'POST',
                    headers: {
                        'Authorization': 'Bearer ' + this.props.token,
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                        },
                })
                //update state for card component
                this.props.addSongsToState(tracks);
            })
    }

    retrieveUserPreference = () =>{
        let path = 'spotifyUsers/' + this.state.firebaseID + '/user/';
        let artistRef = firebase.database().ref(path + 'topArtists');
        let trackRef = firebase.database().ref(path + 'topTracks');
        artistRef.once('value', (snapshot) => {
            let a = snapshot.val();
            this.setState({userArtists: a});
        })
        trackRef.once('value', (snapshot) => {
            let t = snapshot.val();
            this.setState({userTracks: t});
        })
    }

    //handles click event for generate button, calling newPlaylist(), and addTracks()
    handleClick(){
        //takes random sample from users top artists
        var randomArtists = _.sampleSize(this.state.userArtists, 3);
        var randomTracks = _.sampleSize(this.state.userTracks, 2);
        if(this.props.user.product == 'free' || this.props.user.product == 'open') {
            alert('You must have a Spotify Premium Account in order to use this feature.');
        }
        fetch('https://api.spotify.com/v1/users/' + this.state.userId + '/playlists',{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({name: this.props.playlistName, public: true}),
         }).then((response) => response.json())
         .then((data) =>{
            this.addTracks(data.id, randomArtists, randomTracks);
         }).then(() =>{
             //updates state to trigger cards
             this.setState({generated: true})
         })
    }

    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({firebaseID:user.uid});
                let path = 'spotifyUsers/' + user.uid + '/user/'
                let ref = firebase.database().ref(path);
                //get spotify user id
                ref.once('value', (snapshot) => {
                    let id = snapshot.val().id;
                    this.setState({userId:id});
              }).then(() => {
                    this.retrieveUserPreference();
                })
              }
        })
    }

    render(){
        let cards = '';
        //render cards only after playlist generation
        if(this.state.generated){
            cards = <Cards songs={this.props.addedSongs} token={this.props.token}/>
        }
        return(
            <div className="generate-btn" id="generate" aria-label="generate" onClick={this.handleClick}>
                <Popup trigger={
                    <div className="btn-outline" id='generate-txt'>
                        Generate
                    </div>
                } modal>
                {close => (
                    <div className="modal">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <a className="close" aria-label="Close" onClick={close}>
                                    &times;
                                    </a>
                                    <div className="modal-title"> {this.props.playlistName} </div>
                                </div>
                                <div className="modal-body">       
                                    {cards}                               
                                </div>
                                <div className="modal-footer">
                                    <button
                                        className="button"
                                        aria-label="Close"
                                        onClick={() => {
                                        console.log('modal closed ')
                                        close()
                                        }}
                                    >
                                        Generate Another
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </Popup>
            </div>
        )
    }
}

export default Generate;