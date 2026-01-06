const express = require("express");
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

const cookieParser = require("cookie-parser");
const path = require("path");
const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/indexRouter");
const db = require("./config/mongoose-connection");

require("dotenv").config();

app.set("view engine", "ejs");

app.use(
  session({
    secret: "yourSecretKey", // Change this to something secure
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.use("/", indexRouter);

app.listen(3000);
