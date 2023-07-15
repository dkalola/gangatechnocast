const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON request bodies

// Set the template engine
app.set("view engine", "ejs");
app.use("/static", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
