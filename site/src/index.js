import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';
import 'firebase/storage'

var config = {
    apiKey: "AIzaSyC5YoxgSjM3HwJaL2yVZz-4K5aYRwSPGMY",
    authDomain: "personalsite-21df2.firebaseapp.com",
    databaseURL: "https://personalsite-21df2.firebaseio.com",
    projectId: "personalsite-21df2",
    storageBucket: "personalsite-21df2.appspot.com",
    messagingSenderId: "589962441187"
  };
  firebase.initializeApp(config);

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
