const express = require("express");
const {
  getPhones,
  addNewPhone,
  getPhoneById,
  updatePhoneById,
  deletePhoneById,
} = require("../controllers/phones");

const router = express.Router();

router.get("/", getPhones);
router.post("/", addNewPhone);
router.get("/:id", getPhoneById);
router.put("/:id", updatePhoneById);
router.delete("/:id", deletePhoneById);

module.exports = router;
