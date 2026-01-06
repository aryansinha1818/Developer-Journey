const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  contest: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
  answers: [{ question: String, selected: [String] }],
  score: Number,
  submittedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Submission", submissionSchema);
