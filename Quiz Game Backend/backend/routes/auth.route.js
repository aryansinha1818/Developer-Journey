const express = require("express");
const rateLimit = require("express-rate-limit");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: "Too many login/register attempts. Please try again later.",
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);

module.exports = router;
