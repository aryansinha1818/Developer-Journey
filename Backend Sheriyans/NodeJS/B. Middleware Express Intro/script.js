const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("New lines added");
});
app.get("/profile", function (req, res) {
  res.send("Hello I am a server");
});

app.listen(3000);
