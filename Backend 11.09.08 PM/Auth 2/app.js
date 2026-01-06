const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", async (req, res) => {
  let { username, email, password, age } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "hola"); //token bana diya
      res.cookie("token", token); //cookie mein daal diya
      res.send(createdUser);
    });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("token"); //cookie ko clear kar diya
  //   res.send("Logged out successfully");
  res.redirect("/"); // redirect to the home page after logout
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) return res.status(400).send("credentials invalid");

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (result) {
      let token = jwt.sign({ email: user.email }, "hola"); //token bana diya
      res.cookie("token", token); //cookie mein daal diya

      res.send("successfully logged in");
    } else {
      res.status(400).send("credentials invalid");
    }
  });
});

app.listen(3000);
