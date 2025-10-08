const express = require("express");
const router = express.Router();

// ✅ Import controller
const encounterActionsController = require("../controllers/encounterActionsController");

const { 
  createEncounterAction,
  getActionsByEncounter,
  getActionById,
  deleteEncounterAction,
  safeValue,
} = require("../models/encounterActionsModel");

router.post("/", encounterActionsController.create);
router.get("/:encounterId", encounterActionsController.getByEncounter);
router.get("/id/:id", encounterActionsController.getById);
router.delete("/:id", encounterActionsController.delete);

module.exports = router;
