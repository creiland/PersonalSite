import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import resume from '../img/Resume.png'

class Resume extends Component{
    render() {
        return (<div className="res">
                    <img src={resume}></img>
                </div>)
    }
}

export default Resume;