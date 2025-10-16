const express = require("express");
const router = express.Router();
const {
  create,
  getByEncounter,
  getById,
  delete: deleteSpell
} = require("../controllers/encounterSpellsController");

// Create spell
router.post("/", create);

// Get all spells by encounter
router.get("/encounter/:encounterId", getByEncounter);

// Get spell by ID
router.get("/:id", getById);

// Delete spell
router.delete("/:id", deleteSpell);

module.exports = router;
