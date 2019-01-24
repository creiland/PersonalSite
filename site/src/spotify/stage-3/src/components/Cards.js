import React, { Component } from 'react'; //import React Component


// represents a card-deck of song-cards
// takes in an array of Spotify-track objects
// assumes a track structure defined in https://developer.spotify.com/console/get-playlist-tracks/
export class Cards extends Component {
    render() {
        let songsArray = this.props.songs.map((currentTrack) => {
            return(
                <Card track={currentTrack} key={currentTrack.id}/>
            );
        })
        return (
            <div className = "container-fluid">
                <div className="row">
                    {songsArray}
                </div>
            </div>
        );
    }
}

// represents an individual song
// renders a song card for a given JSON Spotify track object
export class Card extends Component {

    render() {
        // assigns to a variable the passed in Spotify track object
        let spotifyTrack = this.props.track
        return (
            <div className = "col-sm-6 col-md-4 col-lg-3">
                <div className = "card genre-card">
                    <div className = "card-body">
                        <div className = "card-image">
                            <img className = "genre" src={spotifyTrack.album.images[0].url} alt = {spotifyTrack.name}/>
                        </div>
                        <div className = "card-title">
                            <h3>{spotifyTrack.name}</h3>
                        </div>
                        <div className = "card-text">
                            <div>Album: {spotifyTrack.album.name}</div>
                            <div>Artist: {spotifyTrack.album.artists[0].name}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}