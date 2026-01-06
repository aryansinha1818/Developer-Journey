const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/contestdb"
    );
    console.log("MongoDB connected successfully ✅");
  } catch (err) {
    console.error(" Database connection error ❌:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
