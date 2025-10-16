const express = require("express");
const router = express.Router();
const characterController = require("../controllers/characterController");

// Routes
router.post("/", characterController.create);
router.get("/:campaignId", characterController.getByCampaign);
router.get("/id/:id", characterController.getById);
router.put("/:id", characterController.update);
router.delete("/:id", characterController.delete);

module.exports = router;
