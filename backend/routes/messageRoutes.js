const express = require("express");
const { createMessage, getMessages, deleteMessage } = require("../controllers/messageController");
const { authenticateUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticateUser, createMessage); // send a message
router.get("/", authenticateUser, getMessages);    // get all messages
router.delete("/:id", authenticateUser, deleteMessage); // delete a message

module.exports = router;


