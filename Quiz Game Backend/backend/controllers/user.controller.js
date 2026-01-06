const mongoose = require("mongoose");
const Submission = require("../models/submission.model");

const getUserHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("🧩 Logged-in user (from token):", userId);

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const submissions = await Submission.find({ user: userObjectId })
      .populate("contest", "name type prize startTime endTime")
      .sort({ submittedAt: -1 });

    if (!submissions.length) {
      return res.status(404).json({ message: "No contest history found" });
    }

    const historyMap = new Map();
    for (const sub of submissions) {
      const contestId = sub.contest._id.toString();
      if (
        !historyMap.has(contestId) ||
        sub.score > historyMap.get(contestId).score
      ) {
        historyMap.set(contestId, sub);
      }
    }

    const history = Array.from(historyMap.values());

    res.status(200).json({
      message: "User contest history fetched successfully",
      history,
    });
  } catch (error) {
    console.error("❌ Error in getUserHistory:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserHistory };
