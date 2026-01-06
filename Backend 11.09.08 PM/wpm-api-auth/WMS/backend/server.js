const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.config");
const inventory = require("./routes/inventory.routes");
const order = require("./routes/order.routes");
const user = require("./routes/user.route.js");

const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", user);
app.use("/inventory", inventory);
app.use("/order", order);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
