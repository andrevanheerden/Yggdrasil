const { createInvite, getInvitesForUser, updateInviteStatus, getInviteById } = require("../models/inviteModel");
const { addCampaignRole } = require("../models/campaignRoleModel");

// Send invite
const sendInvite = async (req, res) => {
  try {
    const { campaign_id, receiver_id } = req.body;
    const sender_id = req.user.user_id;

    if (!campaign_id || !receiver_id)
      return res.status(400).json({ error: "Campaign ID and receiver ID required" });

    await createInvite({ campaign_id, sender_id, receiver_id });
    res.json({ message: "Invite sent successfully" });
  } catch (err) {
    console.error("sendInvite error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Get all pending invites for the logged-in user
const getMyInvites = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const invites = await getInvitesForUser(user_id);
    res.json(invites);
  } catch (err) {
    console.error("getMyInvites error:", err);
    res.status(500).json({ error: err.message });
  }
};

// Respond to invite (accept or reject)
const respondToInvite = async (req, res) => {
  try {
    const { invite_id, accept } = req.body;
    if (accept === undefined) return res.status(400).json({ error: "Accept must be true or false" });

    const invite = await getInviteById(invite_id);
    if (!invite || invite.receiver_id !== req.user.user_id)
      return res.status(404).json({ error: "Invite not found" });

    const status = accept ? "accepted" : "rejected";

    // Update invite status
    await updateInviteStatus(invite_id, status);

    // If accepted, add player role
    if (accept) {
      await addCampaignRole({
        campaign_id: invite.campaign_id,
        user_id: req.user.user_id,
        role: "player",
        invited_by: invite.sender_id
      });
    }

    res.json({ message: `Invite ${status}` });
  } catch (err) {
    console.error("respondToInvite error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendInvite, getMyInvites, respondToInvite };


