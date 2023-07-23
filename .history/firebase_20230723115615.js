// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const { initializeApp } = require("firebase/app");
require("firebase/auth");
const {
  getFirestore,
  collection,
  getDocs,
} = require("firebase/firestore/lite");

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
const fapp = initializeApp(firebaseConfig);
const db = getFirestore(fapp);

module.exports = { fapp, db };
