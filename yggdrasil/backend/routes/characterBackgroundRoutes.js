const express = require("express");
const router = express.Router();
const backgroundController = require("../controllers/characterBackgroundController");

// Routes
router.post("/", backgroundController.create);
router.get("/:characterId", backgroundController.getByCharacter);
router.get("/id/:id", backgroundController.getById);
router.put("/:id", backgroundController.update);
router.delete("/:id", backgroundController.delete);

module.exports = router;
