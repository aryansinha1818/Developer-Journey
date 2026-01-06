const express = require("express");
const router = express.Router();
const { adminOnly } = require("../middleware/auth.middleware");
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../controllers/inventory.controller");

router.post("/", adminOnly, createItem);
router.get("/", adminOnly, getAllItems);
router.get("/:id", adminOnly, getItemById);
router.put("/:id", adminOnly, updateItem);
router.delete("/:id", adminOnly, deleteItem);

module.exports = router;
