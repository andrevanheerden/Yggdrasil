const express = require("express");
const { createMessage, getUserMessages } = require("../controllers/messageController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createMessage); // send a message
router.get("/", authenticateUser, getUserMessages); // get current user's messages

module.exports = router;

