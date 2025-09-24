const express = require("express");
const router = express.Router();
const { 
  createNewCampaign, 
  fetchCampaigns, 
  invitePlayerToCampaign,
  deleteCampaignController, // ✅ use this
  leaveCampaign,
  getCampaignRoles,
  updateCampaign,
  getCampaignDm,
  getMyCampaigns
} = require("../controllers/campaignController");

const { respondToInvite, getMyInvites } = require("../controllers/inviteController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Campaign routes
router.post("/create", authenticateUser, createNewCampaign);
router.get("/", authenticateUser, fetchCampaigns);       // All campaigns (optional)
router.get("/my", authenticateUser, getMyCampaigns);

// Player management
router.post("/invite", authenticateUser, invitePlayerToCampaign);
router.get("/invites", authenticateUser, getMyInvites);
router.post("/respond-invite", authenticateUser, respondToInvite);

router.post("/:campaign_id/leave", authenticateUser, leaveCampaign);

// Info
router.get("/:campaign_id/roles", authenticateUser, getCampaignRoles);
router.get("/:campaign_id/dm", authenticateUser, getCampaignDm);
router.put("/:campaign_id", authenticateUser, updateCampaign);
router.delete("/:campaign_id", authenticateUser, deleteCampaignController); // ✅ only this

module.exports = router;











