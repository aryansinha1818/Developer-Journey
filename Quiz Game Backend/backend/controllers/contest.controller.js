const mongoose = require("mongoose");
const Contest = require("../models/contest.model");
const Question = require("../models/question.model");
const Submission = require("../models/submission.model");
const { calculateScore } = require("../services/scoring.service");

const createContest = async (req, res) => {
  try {
    const { name, description, type, startTime, endTime, prize } = req.body;

    const contest = new Contest({
      name,
      description,
      type,
      startTime,
      endTime,
      prize,
    });

    await contest.save();
    res.status(201).json({
      message: "Contest created successfully",
      contest,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addQuestion = async (req, res) => {
  try {
    const { contestId } = req.params;
    const { text, type, options, correctAnswers } = req.body;

    if (!mongoose.Types.ObjectId.isValid(contestId)) {
      return res.status(400).json({ message: "Invalid contest ID format" });
    }

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    const question = new Question({
      text,
      type,
      options,
      correctAnswers,
      contest: new mongoose.Types.ObjectId(contestId),
    });

    await question.save();
    contest.questions.push(question._id);
    await contest.save();

    res.status(201).json({
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getContests = async (req, res) => {
  try {
    const userRole = req.user?.role || "GUEST";

    let filter = {};
    let projection = "name description type prize startTime endTime";
    let populateQuestions = false;

    if (userRole === "NORMAL") {
      filter = { type: "NORMAL" };
      populateQuestions = true;
    } else if (userRole === "VIP" || userRole === "ADMIN") {
      filter = {};
      populateQuestions = true;
    } else if (userRole === "GUEST") {
      filter = {};
      populateQuestions = false;
    }

    let query = Contest.find(filter).select(projection);

    if (populateQuestions) {
      query = query.populate("questions");
    }

    const contests = await query;

    res.status(200).json({ contests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitContest = async (req, res) => {
  try {
    const { contestId, answers } = req.body;
    const userId = req.user.id;

    const contest = await Contest.findById(contestId).populate("questions");
    if (!contest) return res.status(404).json({ message: "Contest not found" });

    const score = calculateScore(contest.questions, answers);

    const submission = new Submission({
      user: userId,
      contest: contestId,
      answers,
      score,
    });

    await submission.save();

    res.status(200).json({
      message: "Contest submitted successfully",
      score,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createContest,
  addQuestion,
  getContests,
  submitContest,
};
