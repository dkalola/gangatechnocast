const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore/lite");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const firebaseConfig = require("./firebase"); // Import the configuration data

const app = express();

// Initialize Firebase with the configuration data
const fapp = initializeApp(firebaseConfig);
const db = getFirestore(fapp);
const auth = getAuth(fapp); // Get the Auth object
setPersistence(auth, browserLocalPersistence);

app.use(express.json()); // Parse JSON request bodies

// Set the template engine
app.set("view engine", "ejs");
app.use("/assets", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// firebase auth middleware
function ensureAuthenticated(req, res, next) {
  const user = req.user;
  if (user) {
    // User is authenticated, proceed to the next middleware/route handler
    return next();
  } else {
    // User is not authenticated, redirect to the login page or display an error
    res.redirect("/login"); // Change "/login" to your login page route
  }
}

app.get("/", (req, res) => {
  res.render("home", { activePage: "home" });
});

app.get("/wws", (req, res) => {
  res.render("services", { activePage: "services" });
});

app.get("/automotive", (req, res) => {
  res.render("automotive", { activePage: "services" });
});

app.get("/industrial", (req, res) => {
  res.render("industrial", { activePage: "services" });
});

app.get("/energy_power", (req, res) => {
  res.render("energy_power", { activePage: "services" });
});

app.get("/ic", (req, res) => {
  res.render("ic", { activePage: "ic" });
});

app.get("/team", (req, res) => {
  res.render("team", { activePage: "team" });
});

app.get("/admin", ensureAuthenticated, (req, res) => {
  res.render("team", { activePage: "team" });
});

app.get("/login", (req, res) => {
  res.render("login", { activePage: "login" });
});

// Handle login form submission
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(req.body);

  // Authenticate the user using Firebase Authentication
  // Implement the appropriate authentication method (e.g., email/password, Google login, etc.)

  // For example, using Firebase email/password authentication:
  signInWithEmailAndPassword(auth, email, password) // Use the auth object
    .then((userCredential) => {
      // User login successful
      const user = userCredential.user;
      console.log("User logged in:", user.email);
      // Redirect the user to the dashboard or any other page
      res.redirect("/");
    })
    .catch((error) => {
      // Handle login errors here
      console.error("Login error:", error.message);
      // Redirect the user back to the login page with an error message (if needed)
      res.redirect("/login?error=" + encodeURIComponent(error.message));
    });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
