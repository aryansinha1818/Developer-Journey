const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("./public/"));

// Route handlers
app.get("/", function (req, res) {
  throw Error("pata nai bhai");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/error", function (req, res, next) {
  // new Error
  // throw new Error
  throw Error("Something went wrong"); // Example error
});

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("errorFile", { error: err });
}

app.use(errorHandler);

app.listen(3000);
