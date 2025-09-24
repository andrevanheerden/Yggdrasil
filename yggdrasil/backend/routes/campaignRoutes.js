const express = require("express");
const router = express.Router();
const { 
  createNewCampaign, 
  fetchCampaigns, 
  invitePlayerToCampaign,
  deleteCampaign, 
  leaveCampaign,
  getCampaignRoles,
  updateCampaign,
  getCampaignDm
} = require("../controllers/campaignController");

const { respondToInvite, getMyInvites } = require("../controllers/inviteController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Campaign routes
router.post("/create", authenticateUser, createNewCampaign);
router.get("/", authenticateUser, fetchCampaigns);
router.get("/my", authenticateUser, fetchCampaigns);

// Player management
router.post("/invite", authenticateUser, invitePlayerToCampaign);
router.get("/invites", authenticateUser, getMyInvites);
router.post("/respond-invite", authenticateUser, respondToInvite);

router.delete("/:campaign_id", authenticateUser, deleteCampaign);
router.post("/:campaign_id/leave", authenticateUser, leaveCampaign);

// Info
router.get("/:campaign_id/roles", authenticateUser, getCampaignRoles);
router.get("/:campaign_id/dm", authenticateUser, getCampaignDm);
router.put("/:campaign_id", authenticateUser, updateCampaign);

module.exports = router;









