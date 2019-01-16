import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './components/NavBar.js';
import './App.css';
import {Switch, Link, Route} from 'react-router-dom';
import WebDevelopment from './components/WebDevelopment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Switch>
          <Route path = '/programming/webdev' component={WebDevelopment} />
        </Switch>
      </div>
    );
  }
}

export default App;
