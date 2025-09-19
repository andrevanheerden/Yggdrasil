const express = require("express");
const router = express.Router();
const { createNewCampaign, fetchCampaigns, invitePlayerToCampaign } = require("../controllers/campaignController");

const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/create", authenticateUser, createNewCampaign);
router.get("/", authenticateUser, fetchCampaigns);
router.get("/my", authenticateUser, fetchCampaigns);
router.post("/invite", authenticateUser, invitePlayerToCampaign);


module.exports = router;

