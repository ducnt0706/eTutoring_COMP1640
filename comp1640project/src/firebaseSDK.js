import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC24AerWWs2DODeQwizzcjiww95ab9c4dQ",
    authDomain: "etutoring-128c7.firebaseapp.com",
    databaseURL: "https://etutoring-128c7.firebaseio.com",
    projectId: "etutoring-128c7",
    storageBucket: "etutoring-128c7.appspot.com",
    messagingSenderId: "478671068942",
    appId: "1:478671068942:web:50072130d0069c80b1015f",
    measurementId: "G-5RMNZQ0GV9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// TODO: For development (Display firebase log)
window.firebase = firebase;

export default firebase;