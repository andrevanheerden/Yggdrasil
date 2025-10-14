const express = require("express");
const router = express.Router();
const {
  create,
  getByCharacter,
  getById,
  delete: deleteAction
} = require("../controllers/characterActionsController");

// Create action
router.post("/", create);

// Get action by ID first (specific route)
router.get("/id/:id", getById);

// Get all actions by character
router.get("/:characterId", getByCharacter);

// Delete action
router.delete("/:id", deleteAction);

module.exports = router;
