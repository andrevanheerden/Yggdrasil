const express = require("express");
const router = express.Router();
const encounterActionsController = require("../controllers/encounterActionsController");

router.post("/", encounterActionsController.create);

// 👇 Specific route FIRST
router.get("/id/:id", encounterActionsController.getById);

// 👇 General route LAST
router.get("/:encounterId", encounterActionsController.getByEncounter);

router.delete("/:id", encounterActionsController.delete);

module.exports = router;

