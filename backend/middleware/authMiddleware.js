// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// Middleware to authenticate any logged-in user
const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Authorization header missing" });
    }

    // Expect header in format: "Bearer <token>"
    const token = authHeader.split(" ")[1]?.trim();
    if (!token) {
      return res.status(401).json({ error: "Token missing from Authorization header" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store logged-in user info (user_id, role, etc.)
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Middleware to restrict access based on role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "User not authenticated" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied: insufficient permissions" });
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };


