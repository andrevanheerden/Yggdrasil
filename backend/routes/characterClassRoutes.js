const express = require("express");
const router = express.Router();
const classController = require("../controllers/characterClassController");

// Routes
router.post("/", classController.create);
router.get("/character/:characterId", classController.getByCharacter);
router.get("/:id", classController.getById);
router.put("/:id", classController.update);
router.delete("/:id", classController.delete);

module.exports = router;
