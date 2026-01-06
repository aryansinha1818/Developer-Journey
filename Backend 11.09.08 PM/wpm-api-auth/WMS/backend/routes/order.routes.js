const express = require("express");
const router = express.Router();
const { authenticate, adminOnly } = require("../middleware/auth.middleware");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getAllOrders);
router.get("/:id", authenticate, getOrderById);
router.put("/:id", authenticate, updateOrder);

//admin level authorization needed to delete
router.delete("/:id", adminOnly, deleteOrder);

module.exports = router;
