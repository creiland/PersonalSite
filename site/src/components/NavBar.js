import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NavDropdown, Navbar, Nav, NavItem, MenuItem } from 'react-bootstrap';
import '../App.css'

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
                    <h1><Link to='/' className="logo-text">CONOR REILAND</Link></h1>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav>
                <NavDropdown eventKey={1} className='mynav-dropdown' title="Programming" id="basic-nav-dropdown">
                    <MenuItem eventKey={1.1}> <Link to='/programming/webdev'>Web Development</Link></MenuItem>
                    <MenuItem eventKey={1.2}><Link to='/programming/datascience'>Data Science</Link></MenuItem>
                    <MenuItem eventKey={1.3}><Link to='/programming/misc'>Miscellaneous</Link></MenuItem>
                </NavDropdown>
                <NavDropdown eventKey={2} className='mynav-dropdown' title="Photography" id="basic-nav-dropdown">
                    <MenuItem eventKey={2.1}><Link to='/photos/concert'>Concert/Festival</Link></MenuItem>
                    <MenuItem eventKey={2.2}><Link to='/photos/portrait'>Portrait</Link></MenuItem>
                    <MenuItem eventKey={2.3}><Link to='/photos/product'>Product</Link></MenuItem>
                    <MenuItem eventKey={2.4}><Link to='/photos/landscape'>Landscape</Link></MenuItem>
                    <MenuItem eventKey={2.5}><Link to='/photos/travel'>Travel</Link></MenuItem>
                </NavDropdown>
                <NavItem className="mynav-link" eventKey={3}>
                    <Link to="/Design">Design</Link>
                </NavItem>
                <NavItem className="mynav-link" eventKey={4}>
                    <Link to="/Resume">Resume</Link>
                </NavItem>
                <NavItem className="mynav-link" eventKey={5}>
                    <Link to="/contact">Contact</Link>
                </NavItem>
                
                
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