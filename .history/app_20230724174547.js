const express = require("express");
const bodyParser = require("body-parser");
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore/lite");
const {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword,
} = require("firebase/auth");
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
  const user = auth.currentUser;

  if (user) {
    // If the user is authenticated, proceed to the next middleware or route handler
    req.user = user;
    next();
  } else {
    // If the user is not authenticated, redirect to the login page
    res.redirect("/login");
  }
}

app.get("/", (req, res) => {
  res.render("home", { activePage: "home" });
});
app.get("/about", (req, res) => {
  res.render("about", { activePage: "about" });
});

app.get("/wws", (req, res) => {
  res.render("services", { activePage: "services" });
});

const services = [
  {
    title: "Precision Engineering",
    body: ["para 1", "para 2", "para 3"],
  },
  {
    title: "Prototyping Solutions",
    body: ["para 1", "para 2", "para 3"],
  },
  {
    title: "Custom Casting Solutions",
    body: ["para 1", "para 2", "para 3"],
  },
  {
    id: "MA",
    title: "Material Analysis",
    body: ["para 1", "para 2", "para 3"],
  },
  {
    id: "MS",
    title: "Machining Services",
    body: ["para 1", "para 2", "para 3"],
  },
  {
    id: "QI",
    title: "Quality Inspection",
    body: ["para 1", "para 2", "para 3"],
  },
];

// app.get("/service-d", (req, res) => {
//   res.render("service-details", { activePage: "services" });
// });

app.get("/service-d/:service", (req, res) => {
  const serviceID = req.params.service;
  const service = services.find((service) => service.title === serviceID);
  if (!service) {
    // If the service is not found, you can handle the error or render an error page
    // res.status(404).send("Service not found");
    res.render("services", { activePage: "services" });
  } else {
    // Render the service-details page with the corresponding service data
    res.render("service-details", { activePage: "services", service });
  }
});
app.get("/projects", (req, res) => {
  res.render("projects", { activePage: "projects" });
});

app.get("/ic", (req, res) => {
  res.render("ic", { activePage: "ic" });
});


app.get("/contact", (req, res) => {
  res.render("contact", { activePage: "contact" });
});

app.get("/admin", ensureAuthenticated, (req, res) => {
  res.render("admin", { activePage: "admin" });
});

app.get("/login", (req, res) => {
  res.render("login", { activePage: "login" });
});

// Handle login form submission
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Authenticate the user using Firebase Authentication
  // Implement the appropriate authentication method (e.g., email/password, Google login, etc.)

  // For example, using Firebase email/password authentication:
  signInWithEmailAndPassword(auth, email, password) // Use the auth object
    .then((userCredential) => {
      // User login successful
      const user = userCredential.user;
      console.log("User logged in:", user.email);
      // Redirect the user to the dashboard or any other page
      res.redirect("/admin");
    })
    .catch((error) => {
      // Handle login errors here
      console.error("Login error:", error.message);
      // Redirect the user back to the login page with an error message (if needed)
      res.redirect("/login?error=" + encodeURIComponent(error.message));
    });
});

app.get("/logout", (req, res) => {
  auth
    .signOut()
    .then(() => {
      // User logged out successfully
      console.log("User logged out.");
      res.redirect("/login");
    })
    .catch((error) => {
      console.error("Logout error:", error.message);
      res.redirect("/admin"); // Redirect to dashboard or any other page with an error message
    });
});



const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
