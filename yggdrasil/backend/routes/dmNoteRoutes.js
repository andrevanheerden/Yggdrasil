const express = require("express");
const router = express.Router();
const dmNoteController = require("../controllers/dmNoteController");

// GET all notes for a campaign
router.get("/:campaignId", dmNoteController.getByCampaign);

// CREATE a note
router.post("/", dmNoteController.create);

// UPDATE a note
router.put("/:id", dmNoteController.update);

// DELETE a note
router.delete("/:id", dmNoteController.delete);

module.exports = router;
