import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importerar bootstrap
import App from './App';



// Gör att vi kan använda oss av firebase-anrop i denna komponent, behöver göras för alla komponenter där vi vill använda firebase-anrop
const firebase = require('firebase') 

// Detta måste gömmas på något vis, api-nycklar ska inte ligga öppet
const firebaseConfig = {
    apiKey: "AIzaSyDT6Op964wYEV7xUsUvcrCkrjgf_Cy6VoM",
    authDomain: "schack-app.firebaseapp.com",
    databaseURL: "https://schack-app.firebaseio.com",
    projectId: "schack-app",
    storageBucket: "schack-app.appspot.com",
    messagingSenderId: "248239041301",
    appId: "1:248239041301:web:03c4e06cafb50ad4af971c",
    measurementId: "G-EYPL3X6LH0"
  };

// Initialize Firebase --> Görs en gång för hela react-appen
firebase.initializeApp(firebaseConfig);
firebase.analytics();


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
