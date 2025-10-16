const express = require("express");
const router = express.Router();
const raceController = require("../controllers/characterRaceController");

// Routes
router.post("/", raceController.create);
router.get("/character/:characterId", raceController.getByCharacter);
router.get("/:id", raceController.getById);
router.put("/:id", raceController.update);
router.delete("/:id", raceController.delete);

module.exports = router;
