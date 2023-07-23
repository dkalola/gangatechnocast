const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { fapp, db } = require("./firebase"); // Use .js extension

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

app.post("/login", (req, res) => {
  // Process login form data and authenticate the user using Firebase Auth
  // After successful authentication, set user information in req.session or req.user
  const user = {
    id: "user-id-from-firebase", // Get the user ID from Firebase Auth
    name: "John Doe", // Get the user name from Firebase Auth or your database
    // Other user information as needed
  };

  req.user = user; // Set the user information in req.user

  // Redirect the user to the protected page after successful login
  res.redirect("/protected");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
