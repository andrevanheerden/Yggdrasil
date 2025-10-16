const express = require("express");
const router = express.Router();
const characterInventoryController = require("../controllers/characterInventoryController");

router.get("/character/:characterId", characterInventoryController.getByCharacter);
router.get("/id/:id", characterInventoryController.getById);
router.post("/", characterInventoryController.create);
router.delete("/:id", characterInventoryController.delete);

module.exports = router;
