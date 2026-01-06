//express use
const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Time:", Date.now());
  //don't get stuck a lil push
  next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/Aryan", function (req, res) {
  res.send("Hello from profile");
});

app.listen(3000);
