// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore/lite");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCNTpJR9paT82YRjQt-kJbt7uMMO8WJtKA",
  authDomain: "gangatechnocast-6f4d8.firebaseapp.com",
  projectId: "gangatechnocast-6f4d8",
  storageBucket: "gangatechnocast-6f4d8.appspot.com",
  messagingSenderId: "218976895165",
  appId: "1:218976895165:web:52bd80d229e28ca1df77d4",
};

// Initialize Firebase
const fapp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = { fapp, db };