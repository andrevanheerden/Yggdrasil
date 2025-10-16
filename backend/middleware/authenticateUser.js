const jwt = require("jsonwebtoken");

// Middleware to authenticate any logged-in user
const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Authorization header missing" });

    const token = authHeader.split(" ")[1]?.trim();
    if (!token) return res.status(401).json({ error: "Token missing from Authorization header" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Optional role-based middleware
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "User not authenticated" });
  if (!roles.includes(req.user.role)) return res.status(403).json({ error: "Access denied" });
  next();
};

module.exports = { authenticateUser, authorizeRoles };
