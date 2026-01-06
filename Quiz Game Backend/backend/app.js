const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database.config");
const authRoutes = require("./routes/auth.route");
const contestRoutes = require("./routes/contest.route");
const leaderboardRoutes = require("./routes/leaderboard.route");
const rateLimit = require("express-rate-limit");
const userRoutes = require("./routes/user.route");

dotenv.config();

process.env.PORT = process.env.PORT || 3050;

connectDB();

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

const app = express();
app.use(express.json());
app.use(globalLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/contests", contestRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
