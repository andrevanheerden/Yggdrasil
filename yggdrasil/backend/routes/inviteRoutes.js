// routes/inviteRoutes.js
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authMiddleware");
const { sendInvite, getMyInvites, respondToInvite } = require("../controllers/inviteController");

router.post("/send", authenticateUser, sendInvite);
router.get("/my", authenticateUser, getMyInvites);
router.post("/respond", authenticateUser, respondToInvite);

module.exports = router;
