const express = require("express");
const { signup, login, getCurrentUser } = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticateUser, getCurrentUser);

module.exports = router;
