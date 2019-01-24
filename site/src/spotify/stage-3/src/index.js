import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';

import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAK7cr58IA2kw6IF0GXNmmc7prsKt-1ByU",
    authDomain: "moment-music.firebaseapp.com",
    databaseURL: "https://moment-music.firebaseio.com",
    projectId: "moment-music",
    storageBucket: "moment-music.appspot.com",
    messagingSenderId: "850042739182"
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
