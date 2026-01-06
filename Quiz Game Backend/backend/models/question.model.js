const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  contest: { type: mongoose.Schema.Types.ObjectId, ref: "Contest" },
  text: String,
  type: {
    type: String,
    enum: ["SINGLE", "MULTI", "TRUE_FALSE"],
    required: true,
  },
  options: [String],
  correctAnswers: [String],
});

module.exports = mongoose.model("Question", questionSchema);
