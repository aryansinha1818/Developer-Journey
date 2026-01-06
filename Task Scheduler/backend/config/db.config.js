const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.error("DB connection error:", err));
};

module.exports = connectDB;
