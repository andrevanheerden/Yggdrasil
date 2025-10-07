const express = require("express");
const router = express.Router();
const encounterInventoryController = require("../controllers/encounterInventoryController");

router.post("/", encounterInventoryController.create);
router.get("/:encounterId", encounterInventoryController.getByEncounter);
router.get("/id/:id", encounterInventoryController.getById);
router.delete("/:id", encounterInventoryController.delete);

module.exports = router;
