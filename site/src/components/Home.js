import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import data from '../img/data.png';
import web from '../img/coding.png';
import profile from '../img/me.png';
import photo from '../img/photo.png';
import music from '../img/music.png';
import design from '../img/design.png';

class Home extends Component{
    constructor(props){
        super(props);
        this.state = {hover:false}
    }

    render() {
        return (
        <div className = "main-container">
            <Card image={data} text="Data Science" />
            <Card image={web} text="Web Development" />
            <Card image={profile} text="About Conor" />
            <Card image={photo} text="Photography" />
            <Card image={design} text="Graphic Design" />
            <Card image={music} text="Music" />
        </div>
        )
    }
}

class Card extends Component{
    constructor(props){
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.state = {hover:false};
    }

    handleMouseHover() {
        this.setState(this.toggleHoverState);
    }

    toggleHoverState() {
        return {
            hover: !this.state.hover,
        };
    }

    render() {
        let content = <img src={this.props.image} />
        if(this.state.hover){
            content = <h1>{this.props.text}</h1>
        }
        return (
            <div className="home-card" onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseHover}>
                <div className="card-content">
                    {content}
                </div>
            </div>
        )
    }
}

export default Home;