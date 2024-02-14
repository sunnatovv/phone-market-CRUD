const express = require("express");
const {
  getPayments,
  addNewPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} = require("../controllers/payments");

const router = express.Router();

router.get("/", getPayments);
router.post("/", addNewPayment);
router.get("/:id", getPaymentById);
router.put("/:id", updatePaymentById);
router.delete("/:id", deletePaymentById);

module.exports = router;
