const express = require("express");
const router = express.Router();
const characterBackgroundController = require("../controllers/characterBackgroundController");

// CREATE
router.post("/", characterBackgroundController.create);

// GET background by character
router.get("/character/:characterId", characterBackgroundController.getByCharacter);

// GET background by ID
router.get("/:id", characterBackgroundController.getById);

// UPDATE
router.put("/:id", characterBackgroundController.update);

// DELETE
router.delete("/:id", characterBackgroundController.delete);

module.exports = router;
