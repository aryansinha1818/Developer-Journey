const jwt = require("jsonwebtoken");

const checkRole = (requiredRole) => async (req, res, next) => {
  const token =
    req.header("Authorization")?.replace("Bearer ", "") || req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "No authentication token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    if (requiredRole && req.user.role !== requiredRole) {
      return res.status(403).json({
        error: "Forbidden",
        message: `Required role: ${requiredRole}`,
      });
    }

    next();
  } catch (error) {
    let message = "Invalid token";
    if (error.name === "TokenExpiredError") {
      message = "Token expired";
    } else if (error.name === "JsonWebTokenError") {
      message = "Malformed token";
    }

    res.status(401).json({
      error: "Unauthorized",
      message,
    });
  }
};

module.exports = {
  authenticate: checkRole(),
  adminOnly: checkRole("admin"),
  workerOnly: checkRole("worker"),
};
