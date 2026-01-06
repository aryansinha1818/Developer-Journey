const express = require("express");
const router = express.Router();
const {
  getLeaderboard,
  getTopScorer,
  getUserHistory,
} = require("../controllers/leaderboard.controller");
const { authenticate } = require("../middlewares/auth.middleware");

router.get("/", authenticate, getLeaderboard);

router.get("/:contestId/top", authenticate, getTopScorer);

router.get("/user/history", authenticate, getUserHistory);

module.exports = router;
