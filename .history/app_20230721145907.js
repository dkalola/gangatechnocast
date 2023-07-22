const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
