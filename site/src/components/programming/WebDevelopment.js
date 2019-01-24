import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../ProjectCard';
import spotifyimg from '../../img/spotifyimg.png';
//import App from '../../spotify/stage-3/src/App'

class WebDevProjects extends Component{
    render() {
        return (
            <div className="card-grid">
                    <ProjectCard 
                    name="Spotify Playlist Generator" 
                    collabs="Jon Lin" 
                    date="Fall, 2018" 
                    img={spotifyimg} 
                    tech="React, Firebase, Spotify API" 
                    github="https://github.com/info340c-au18/stage-0-topic-proposal-creiland"
                    link="/webdev/spotifyproject/"/>
                    <ProjectCard 
                    name="Personal Site" 
                    collabs="N/A" 
                    date="January, 2018" 
                    img={spotifyimg} 
                    tech="React, Firebase" 
                    github="https://github.com/creiland/PersonalSite"
                    link="/"/>
            </div>
        )
    }
}

export default WebDevProjects;