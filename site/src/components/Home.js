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
            <Card image={data} text="Data Science" url="/programming/datascience" />
            <Card image={web} text="Web Development" url="/programming/webdev" />
            <Card image={profile} text="About Conor" url="/contact" />
            <Card image={photo} text="Photography" url="/photography"/>
            <Card image={design} text="Graphic Design" url="/design" />
            <Card image={music} text="Music" url="/music" />
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
            content = <Link to={this.props.url}><h1>{this.props.text}</h1></Link>
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