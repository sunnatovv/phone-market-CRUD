const express = require("express");
const {
  getContracts,
  addNewContract,
  getContractById,
  updateContractById,
  deleteContractById,
} = require("../controllers/contract");

const router = express.Router();

router.get("/", getContracts);
router.post("/", addNewContract);
router.get("/:id", getContractById);
router.put("/:id", updateContractById);
router.delete("/:id", deleteContractById);

module.exports = router;
