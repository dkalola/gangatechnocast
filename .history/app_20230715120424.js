const express = require("express");
const app = express();

app.use(express.json()); // Parse JSON request bodies
app.use(express.static("public")); // Serve static files from the 'public' directory

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
