const express = require("express");

const router = express.Router();

const modelsRoute = require("./module");
const customerRoute = require("./customers");
const contractRoute = require("./contract");
const paymentsRoute = require("./payments");
const phonesRoute = require("./phones");

router.use("/model", modelsRoute);
router.use("/customers", customerRoute);
router.use("/contracts", contractRoute);
router.use("/payments", paymentsRoute);
router.use("/phones", phonesRoute);

module.exports = router;
