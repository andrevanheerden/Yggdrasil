const jwt = require("jsonwebtoken");

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

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // store logged-in user info
    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = { authenticateUser };

