const express = require("express");
const app = express();

app.use((req, res, next) => {
  next();
});

app.get("/", function (req, res) {
  res.send("Home Page ");
});

app.get("/profile/Rahul", function (req, res) {
  res.send("Hi I am Rahul");
});

app.get("/users/:users", function (req, res) {
  res.send(`Hi I user ${req.params.users}`);
});

app.listen(3000);
