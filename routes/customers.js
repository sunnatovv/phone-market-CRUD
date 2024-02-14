const express = require("express");
const {
  getCustomers,
  addNewCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
} = require("../controllers/customers");

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addNewCustomer);
router.get("/:id", getCustomerById);
router.put("/:id", updateCustomerById);
router.delete("/:id", deleteCustomerById);

module.exports = router;
