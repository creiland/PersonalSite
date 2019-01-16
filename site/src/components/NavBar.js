import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import WebDevelopment from './WebDevelopment.js'

class NavBar extends Component{
    render() {
        return (
            /*
            <nav>
                <div className="logo" aria-label="sign in">
                    <h1><Link to='/' className="logo-text">Conor Reiland</Link></h1>
                </div>
                <Navigation />
            </nav>
            */

            <Navbar className="mynav" inverse collapseOnSelect>
            <Navbar.Header className="logo">
                <Navbar.Brand className="logo">
                    <h1><Link to='/' className="logo-text">Conor Reiland</Link></h1>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                <NavDropdown eventKey={1} className='mynav-dropdown' title="Programming" id="basic-nav-dropdown">
                    <MenuItem eventKey={1.1}> <Link to='/programming/webdev'>Web Development</Link></MenuItem>
                    <MenuItem eventKey={1.2}>Data Science</MenuItem>
                    <MenuItem eventKey={1.3}>Other</MenuItem>
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        );   
    }
}

class Navigation extends Component{
    render(){
        return <div></div>
    }
}


export default NavBar;