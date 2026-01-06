const express = require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { getUserHistory } = require("../controllers/user.controller");

const router = express.Router();

router.get("/history", authenticate, getUserHistory);

module.exports = router;
