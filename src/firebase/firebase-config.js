// Import the functions you need from the SDKs you need

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsyrnAoLxGIvyj6vmxVy9WQZKDVFshToY",
  authDomain: "react-journal-app-da872.firebaseapp.com",
  projectId: "react-journal-app-da872",
  storageBucket: "react-journal-app-da872.appspot.com",
  messagingSenderId: "866953907851",
  appId: "1:866953907851:web:d72b27b9540a415747ce8e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleProvider= new firebase.auth.GoogleAuthProvider();

export {
  db,
  googleProvider,
  firebase
}