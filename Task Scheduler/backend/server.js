const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const user = require("./routes/user.route");
const task = require("./routes/task.route");
const connectDB = require("./config/db.config");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:3001", "http://localhost:5173"], // Add both ports
    credentials: true,
  })
);

app.use(express.json());

const PORT = process.env.PORT || 5000;
connectDB();

app.use("/user", user);
app.use("/task", task);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
