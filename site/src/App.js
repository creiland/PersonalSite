import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar.js';
import './App.css';
import {Switch, Link, Route, Redirect} from 'react-router-dom';
import WebDevelopment from './components/programming/WebDevelopment';
import MiscProgramming from './components/programming/MiscProgramming';
import DataScience from './components/programming/DataScience';
import Contact from './components/Contact';
import Resume from './components/Resume';
import Design from './components/Design';
import Home from './components/Home'
import ConcertPhotos from './components/photography/ConcertPhotos';
import Portrait from './components/photography/Portrait';
import Travel from './components/photography/Travel';
import ProductPhotos from './components/photography/ProductPhotos.js';
import Landscape from './components/photography/Landscape';



class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path = "/" component={Home} />
          {/* Routes for programming */}
          <Route path = '/programming/webdev' component={WebDevelopment} />
          <Route path = '/programming/datascience' component={DataScience} />
          <Route path = '/programming/misc' component={MiscProgramming} />
          {/* Routes for photos */}
          <Route path = '/photos/concert' component={ConcertPhotos} />
          <Route path = '/photos/portrait' component={Portrait} />
          <Route path = '/photos/product' component={ProductPhotos} />
          <Route path = '/photos/travel' component={Travel} />
          <Route path = '/photos/landscape' component={Landscape} />
          <Route path = '/contact' component={Contact} />
          <Route path = '/resume' component={Resume} />
          <Route path = '/design' component={Design} />
          <Redirect to = '/' />
        </Switch>
      </div>
    );
  }
}

export default App;
