import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import NavBarProfile from './NavBarProfile';

class NavBar extends Component{
    render(){
        return (
            <nav>
            <div className="logo" aria-label="sign in">
              <h1><Link to='/' className="logo-text">Moment Music</Link></h1>
            </div>
            { this.props.loggedIn ? (
              <NavBarProfile loginClicked = {this.props.loginClicked} user={this.props.user} loggedIn = {this.props.loggedIn} />
            ) : (<div></div>) }
        </nav>
        );   
    }
}


export default NavBar;