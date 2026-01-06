const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public/"));

app.get("/", function (req, res) {
  res.render("index", { Hello: "Hi, I am Aryan, let's deep dive into" });
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.listen(3000);
