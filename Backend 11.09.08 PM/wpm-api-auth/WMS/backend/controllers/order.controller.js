const orderModel = require("../models/order.model");
const Joi = require("joi");

const orderSchema = Joi.object({
  item: Joi.string().min(1).required().messages({
    "string.empty": "Item name cannot be empty",
    "any.required": "Item name is required",
  }),
  quantity: Joi.number().min(1).required().messages({
    "number.base": "Quantity must be a number",
    "number.min": "Quantity must be at least 1",
    "any.required": "Quantity is required",
  }),
  status: Joi.string().valid("pending", "shipped").default("pending"),
});

const createOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });
  }

  try {
    const order = await orderModel.create(req.body);
    return res.status(201).json({
      message: "Order created successfully!",
      order,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error creating new order",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving orders",
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) return res.status(200).json(order);
    return res.status(404).json({ message: "Order not found" });
  } catch (error) {
    return res.status(400).json({
      message: "Invalid ID format",
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Validation error",
      error: error.details[0].message,
    });
  }

  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order updated successfully",
      updatedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating order",
      error: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await orderModel.findByIdAndDelete(req.params.id);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order deleted successfully",
      deletedOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting order",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
