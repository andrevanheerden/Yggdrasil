const express = require("express");
const router = express.Router();
const { 
  createNewCampaign, 
  fetchCampaigns, 
  invitePlayerToCampaign,
  deleteCampaign, 
  leaveCampaign,
  getCampaignRoles,
  updateCampaign,    // ← existing update route
  getCampaignDm      // ← import the new DM function
} = require("../controllers/campaignController");

const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/create", authenticateUser, createNewCampaign);
router.get("/", authenticateUser, fetchCampaigns);
router.get("/my", authenticateUser, fetchCampaigns);
router.post("/invite", authenticateUser, invitePlayerToCampaign);
router.delete("/:campaign_id", authenticateUser, deleteCampaign);
router.post("/:campaign_id/leave", authenticateUser, leaveCampaign);
router.get("/:campaign_id/roles", authenticateUser, getCampaignRoles);
router.get("/:campaign_id/dm", authenticateUser, getCampaignDm); // ← new DM route
router.put("/:campaign_id", authenticateUser, updateCampaign);   // ← edit route

module.exports = router;



