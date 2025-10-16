const express = require("express");
const router = express.Router();

const { 
  createNewCampaign, 
  fetchCampaigns, 
  invitePlayerToCampaign,
  deleteCampaignController,
  leaveCampaign,
  getCampaignRoles,
  updateCampaign,
  getCampaignDm,
  getMyCampaigns,
  getCampaignPlayers   // <-- import it here
} = require("../controllers/campaignController");

const { respondToInvite, getMyInvites } = require("../controllers/inviteController");
const { authenticateUser } = require("../middleware/authMiddleware");

// Campaign routes
router.post("/create", authenticateUser, createNewCampaign);
router.get("/", authenticateUser, fetchCampaigns);
router.get("/my", authenticateUser, getMyCampaigns);

// Player management
router.post("/invite", authenticateUser, invitePlayerToCampaign);
router.get("/invites", authenticateUser, getMyInvites);
router.post("/respond-invite", authenticateUser, respondToInvite);

router.post("/:campaign_id/leave", authenticateUser, leaveCampaign);

// Info
router.get("/:campaign_id/roles", authenticateUser, getCampaignRoles);
router.get("/:campaign_id/dm", authenticateUser, getCampaignDm);
router.get("/:campaign_id/players", authenticateUser, getCampaignPlayers); // <-- now works
router.put("/:campaign_id", authenticateUser, updateCampaign);
router.delete("/:campaign_id", authenticateUser, deleteCampaignController);

module.exports = router;






