// encounterInventoryRoutes.js
const express = require("express");
const router = express.Router();
const encounterInventoryController = require("../controllers/encounterInventoryController");

// Corrected line:
router.get("/encounter/:encounterId", encounterInventoryController.getByEncounter);

router.get("/id/:id", encounterInventoryController.getById);
router.post("/", encounterInventoryController.create);
router.delete("/:id", encounterInventoryController.delete);

module.exports = router;
