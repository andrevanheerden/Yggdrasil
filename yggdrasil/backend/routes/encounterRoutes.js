const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
  createNewEncounter,
  fetchEncountersByCampaign,
  fetchEncounterById
} = require("../controllers/encounterController");

router.use(fileUpload({ useTempFiles: true }));

router.post("/create", createNewEncounter);
router.get("/campaign/:campaign_id", fetchEncountersByCampaign);
router.get("/:encounter_id", fetchEncounterById);

module.exports = router;
