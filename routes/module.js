const express = require("express");

const {
  getModels,
  addNewModel,
  getModelById,
  updateModelById,
  deleteModelrById,
} = require("../controllers/module");

const router = express.Router();

router.get("/", getModels);
router.post("/", addNewModel);
router.get("/:id", getModelById);
router.put("/:id", updateModelById);
router.delete("/:id", deleteModelrById);

module.exports = router;
