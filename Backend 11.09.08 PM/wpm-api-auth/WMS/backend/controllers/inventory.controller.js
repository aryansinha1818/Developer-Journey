const InventoryModel = require("../models/inventory.model");
const Joi = require("joi");

const inventorySchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": "Item name cannot be empty",
    "any.required": "Item name is required",
  }),
  quantity: Joi.number().min(0).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity cannot be negative",
    "any.required": "Quantity is required",
  }),
  location: Joi.string().allow("").optional(),
});

const createItem = async (req, res) => {
  const { error } = inventorySchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });
  }

  try {
    const item = await InventoryModel.create(req.body);

    return res.status(201).json({
      message: "Item created successfully!",
      item,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating new inventory item",
      error: error.message,
    });
  }
};

const getAllItems = async (req, res) => {
  try {
    const data = await InventoryModel.find();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(404).json({ message: "Error!!, Cannot get all records" });
  }
};

const getItemById = async (req, res) => {
  try {
    const data = await InventoryModel.findById(req.params.id);
    if (data) return res.json(data);
    return res.status(404).json({ error: "Item not found" });
  } catch (error) {
    return res.status(404).json({ error: "Invalid Id!!" });
  }
};

const updateItem = async (req, res) => {
  const { error } = inventorySchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });
  }

  try {
    const updatedItem = await InventoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({
      message: "Item updated successfully",
      updatedItem: updatedItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating item",
      error: error.message,
    });
  }
};

const deleteItem = async (req, res) => {
  try {
    const deletedItem = await InventoryModel.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json({
      message: "Item deleted successfully",
      deletedItem: deletedItem,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting item",
      error: error.message,
    });
  }
};

module.exports = {
  createItem,
  getItemById,
  getAllItems,
  updateItem,
  deleteItem,
};
