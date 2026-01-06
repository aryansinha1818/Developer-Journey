const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");
const Joi = require("joi");

const registerUser = async function (req, res) {
  const registerSchema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
  const { email, password, fullname } = req.body;

  // Validate input
  const { error } = registerSchema.validate({ email, password, fullname });
  if (error) {
    return res.render("index", { error: error.details[0].message });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.render("index", { error: "Email already registered" });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          return res.render("index", { error: err.message });
        } else {
          let user = await userModel.create({
            email,
            password: hash,
            fullname,
          });

          let token = generateToken(user);

          res.cookie("token", token);
          res.send("user registered successfully");
        }
      });
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.render("index", { error: "Something went wrong. Try again!" });
  }
};

const loginUser = async function (req, res) {
  let { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.render("index", { error: "Invalid email or password" });
    }
    // plain password from form and hashed password from db
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.render("index", { error: "Invalid email or password" });
      }

      if (result) {
        let token = generateToken(user);

        res.cookie("token", token);
        // res.render("shop");
        // res.send("user logged in successfully");
        res.render("shop");
      } else {
        return res.render("index", { error: "Invalid email or password" });
      }
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.render("index", { error: "Something went wrong. Try again!" });
  }
};

module.exports = { registerUser, loginUser };
