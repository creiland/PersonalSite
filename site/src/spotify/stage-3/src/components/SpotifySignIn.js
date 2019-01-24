import React, { Component } from 'react';

class SpotifySignIn extends Component {

    render(){
        return (
            <div className="playlist-options">
                <div className="spotify-btn" aria-label="Spotify Sign In" onClick={this.props.loginClicked}>
                    <div className="btn-outline" id='generate-txt'>
                        Login with Spotify
                    </div>
                </div>
          </div>
        )
    }
}

export default SpotifySignIn;