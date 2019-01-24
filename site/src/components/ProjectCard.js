import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import App from '../../spotify/stage-3/src/App'

class ProjectCard extends Component{
    render() {
        return (
            <div className='project-card-right'>
                <div className="proj-card-content">
                    <div className='project-image'>
                        <img src={this.props.img} />
                    </div>
                    <div className='project-text'>
                        <h1>{this.props.name}</h1>
                        <ul>
                            <li>Collaborators: {this.props.collabs}</li>
                            <li>Date: {this.props.date}</li>
                            <li>Tech: {this.props.tech}</li>
                        </ul>
                        <div className="btns">
                            <a className="gh-btn" href={this.props.github} aria-label="github">
                                <div className="btn-outline">
                                    Github
                                </div>
                            </a>
                            <Link className="proj-btn" to={this.props.link} aria-label="new playlist">
                                <div className="btn-outline">
                                    <p>View Project</p>
                                </div>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectCard