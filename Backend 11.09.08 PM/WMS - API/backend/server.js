const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db.config");
const inventory = require("./routes/inventory.routes");
const order = require("./routes/order.routes");

const app = express();
dotenv.config();

connectDB();

app.use(express.json());

app.use("/inventory", inventory);
app.use("/order", order);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
