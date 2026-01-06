const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET
    // { expiresIn: "1d" }
  );
};

const protect = (requiredRole) => async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (requiredRole && req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = { generateToken, protect };
