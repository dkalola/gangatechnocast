const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON request bodies

// Set 'views' directory for any template files
app.set("views", path.join(__dirname, "views"));

// Set the template engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});