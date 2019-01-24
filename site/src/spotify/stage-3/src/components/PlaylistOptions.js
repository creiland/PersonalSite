import React, { Component } from 'react';
import Generate from './Generate';
import Dropdown from './Dropdown';

class PlaylistOptions extends Component{
    constructor (){
        super();
        this.state = {
            mood: [
                {
                  id: 0,
                  title: 'Happy',
                  selected: false,
                  key: 'mood'
                },
                {
                  id: 1,
                  title: 'Sad',
                  selected: false,
                  key: 'mood'
                },
                {
                  id: 2,
                  title: 'Excited',
                  selected: false,
                  key: 'mood'
                }
              ],
              playlistName: "New Playlist",
              currentMood: "Happy",
              addedSongs: [],
        }
        this.updateMood = this.updateMood.bind(this);
    }

    //updates the mood in the state for use in search algorithm
    updateMood = (mood) =>{
        this.setState({currentMood: mood})
    }

    //adds the new songs to be added to the playlist to a state array for use in cards component
    addSongsToState = (songs) =>{
        this.setState({addedSongs: songs})
    }

    //toggles selection on dropdown menu
    toggleSelected = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]))
        temp[id].selected = !temp[id].selected
        this.setState({
          [key]: temp
        })
      }
      
      //reset selected in dropdown
      resetThenSet = (id, key) => {
        let temp = JSON.parse(JSON.stringify(this.state[key]))
        temp.forEach(item => item.selected = false);
        temp[id].selected = true;
        this.setState({
          [key]: temp
        })
      }

      //handles user input for playlist name and updates state with new name
      handleChange = (event) => {
        this.setState({playlistName: event.target.value});
      }

    render(){
        return(
            <main className='home-main'>
                <div className="playlist-options">
                    <header className="desc">
                        <h1>Create a playlist for any occasion.</h1>
                        <p>Select one or more filters to add a unique spin to your new playlist. Want a playlist for a sunny bike ride in the Autumn? Select weather, season, set your activity to bike ride and press generate and we'll generate a random playlist full of songs to perfectly fit your moment.</p>
                    </header>
                    <div className="dropdown-options" id='dropdown-opt'>
                        <div className="custom-select" id="myDropdown">
                            <Dropdown 
                                title="Select Mood"
                                list={this.state.mood}
                                resetThenSet={this.resetThenSet}
                                updateMood = {this.updateMood}
                            />
                        </div>
                    </div> 
                    <form className="playlist-form" >
                        <input type='text' id="playlistname" name="playlistname" placeholder="Name Your Playlist" className ="playlist-name" onChange={this.handleChange}/>
                    </form>
                    <Generate user={this.props.user} token={this.props.token} playlistName={this.state.playlistName} topArtists={this.props.topArtists} topTracks={this.props.topTracks} mood={this.state.currentMood} addedSongs={this.state.addedSongs} addSongsToState={this.addSongsToState}/>
                </div>
            </main>
        )
    }
}

export default PlaylistOptions;