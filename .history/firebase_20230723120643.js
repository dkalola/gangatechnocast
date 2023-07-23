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
const auth = getAuth(fapp); // Get the Auth object

module.exports = { firebaseConfig };
