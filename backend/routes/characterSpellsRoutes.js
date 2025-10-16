const express = require("express");
const router = express.Router();
const {
  create,
  getByCharacter,
  getById,
  delete: deleteSpell
} = require("../controllers/characterSpellsController");

// Create spell
router.post("/", create);

// Get all spells by character
router.get("/character/:characterId", getByCharacter);

// Get spell by ID
router.get("/:id", getById);

// Delete spell
router.delete("/:id", deleteSpell);

module.exports = router;
