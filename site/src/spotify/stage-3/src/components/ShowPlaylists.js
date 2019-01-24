import React, { Component } from 'react';
import '../style.css';
import defaultImg from '../img/default-playlist.JPG'

class ShowPlaylists extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: null,
            playlists: [],
            loading: true,
            totalPlaylists: 0
        }
    }

    fetchPlaylists = () => {
        fetch("https://api.spotify.com/v1/me/playlists", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.token
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                let newPlaylists = responseJson.items.map((data) => {
                    // console.log(responseJson);
                    let simplePlaylist = {
                        name: data.name,
                        images: data.images,
                        url: data.external_urls,
                        owner: data.owner,
                        tracks: data.tracks,
                        id: data.id,
                        // length: totalLength
                    };
                    return simplePlaylist;
                })
                this.setState({ playlists: newPlaylists });
                this.setState({ loading: false });
                this.setState({totalPlaylists: newPlaylists.length});
            })
        .catch((error) => {
            console.log(error.message);
        })
    }

    componentDidMount(){
        this.fetchPlaylists();
    }



    render() {
        let content = null;
        if(!this.state.loading){
            content = (
                <div className="your-playlists">
                    <h1 className="playlist-header">{this.props.currentUser.username}'s playlists:</h1>
                    {this.state.playlists.map((playlist) => {
                        return <Playlist playlist={playlist} key={playlist.id}/> })}
                </div>
            );
        } else {
            content = (
                <div className="text-center">
                  <i className="spinner fa fa-spinner fa-spin fa-3x" aria-label="Loading..."></i>
                </div>
              );
        }
        return (
            <main className="home-main">
                    {content}
            </main>
        )
    }
}

class Playlist extends Component {
    render() {
        let link = 'http://open.spotify.com/playlist/' + this.props.playlist.id;
        let image = defaultImg;
        if(this.props.playlist.images[0]){
            image = this.props.playlist.images[0].url;
        }
        return (
            <a href = {link} className='playlist'>
                <img className="playlist-img" src={image} alt='playlist-cover-art' />
                <h2 className="playlist-name">{this.props.playlist.name}</h2>
                <p>Playlist by {this.props.playlist.owner.display_name} with {this.props.playlist.tracks.total} tracks.</p>
            </a>
        );
    }
}

export default ShowPlaylists;