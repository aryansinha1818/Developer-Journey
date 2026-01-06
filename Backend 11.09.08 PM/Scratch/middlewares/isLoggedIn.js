const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/?error=Please login to continue");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.redirect("/?error=Please login to continue");
  }
};

module.exports = { isLoggedIn };
