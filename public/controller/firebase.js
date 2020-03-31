import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB-0TDOqaQy9o2YceL10EAtmiIsNOf73iU",
    authDomain: "comp-1640-project.firebaseapp.com",
    databaseURL: "https://comp-1640-project.firebaseio.com",
    projectId: "comp-1640-project",
    storageBucket: "comp-1640-project.appspot.com",
    messagingSenderId: "561926264074",
    appId: "1:561926264074:web:175d91474bf97eddebd6f3",
    measurementId: "G-7FW93NQRMW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export const firestore=firebase.firestore();
  export default firebase;