const express = require("express");
const router = express.Router();
const encounterController = require("../controllers/encounterController");

router.post("/", encounterController.create);
router.get("/campaign/:campaignId", encounterController.getByCampaign);
router.get("/:id", encounterController.getById);
router.put("/:id", encounterController.update);
router.delete("/:id", encounterController.delete);

module.exports = router;
