// firebase.js
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore/lite");

const firebaseConfig = {
  // Your Firebase configuration here
};

// Initialize Firebase
const fapp = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

module.exports = { fapp, db };
