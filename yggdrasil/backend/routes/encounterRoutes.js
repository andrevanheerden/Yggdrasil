const express = require("express");
const router = express.Router();
const encounterController = require("../controllers/encounterController");

// Routes
router.post("/", encounterController.create);
router.get("/:campaignId", encounterController.getByCampaign);
router.get("/id/:id", encounterController.getById);
router.put("/:id", encounterController.update);
router.delete("/:id", encounterController.delete);

module.exports = router;
