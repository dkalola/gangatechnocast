const dotenv = require("dotenv");
dotenv.config();

const firebaseConfig = {
  // apiKey: "AIzaSyCNTpJR9paT82YRjQt-kJbt7uMMO8WJtKA",
  // authDomain: "gangatechnocast-6f4d8.firebaseapp.com",
  // projectId: "gangatechnocast-6f4d8",
  // storageBucket: "gangatechnocast-6f4d8.appspot.com",
  // messagingSenderId: "218976895165",
  // appId: "1:218976895165:web:52bd80d229e28ca1df77d4",

  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

module.exports = firebaseConfig;
