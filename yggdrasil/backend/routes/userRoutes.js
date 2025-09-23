const express = require("express");
const { signup, login, getCurrentUser, updateCurrentUser } = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authenticateUser, getCurrentUser);
router.put("/me", authenticateUser, updateCurrentUser); // <-- add this

module.exports = router;

