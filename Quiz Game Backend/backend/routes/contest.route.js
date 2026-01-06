const express = require("express");
const {
  createContest,
  addQuestion,
  getContests,
  submitContest,
} = require("../controllers/contest.controller");
const {
  authenticate,
  optionalAuth,
} = require("../middlewares/auth.middleware");
const { authorizeRoles } = require("../middlewares/role.middleware");

const router = express.Router();

router.post("/", authenticate, authorizeRoles("ADMIN"), createContest);

router.post(
  "/:contestId/question",
  authenticate,
  authorizeRoles("ADMIN"),
  addQuestion
);

router.get("/", optionalAuth, getContests);

router.post("/submit", authenticate, submitContest);

module.exports = router;
