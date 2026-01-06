const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { generateToken } = require("../utils/auth.utils.js");

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  adminKey: Joi.string().allow("").optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password, fullname, adminKey } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const role = adminKey === process.env.ADMIN_SECRET_KEY ? "admin" : "worker";

    const user = await userModel.create({
      email,
      password: hash,
      fullname,
      role,
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ error: "Something went wrong. Try again!" });
  }
};

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
        fullname: user.fullname,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ error: "Something went wrong. Try again!" });
  }
};

module.exports = {
  login,
  register,
};
