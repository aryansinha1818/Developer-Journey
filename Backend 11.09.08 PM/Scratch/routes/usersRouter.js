const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller.js");

const { isLoggedIn } = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  res.send("hey it's working");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("user logged out successfully");
});

module.exports = router;
