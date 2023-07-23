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

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
