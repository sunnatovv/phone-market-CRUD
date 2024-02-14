const db = require("../config/db");

const getContracts = (req, res) => {
  db.query("SELECT * FROM contracts", (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Internal server Error" });
    }
    console.log(fields);
    res.json(result);
  });
};

const addNewContract = (req, res) => {
  const {
    muddati,
    contract_starts,
    phone_id,
    total_price,
    customer_id, // Fixed typo here
    boshlangich_tolov,
    oylik_tolov,
    qachon_tolashi,
  } = req.body;

  db.query(
    "INSERT INTO contracts (muddati, contract_starts, phone_id, total_price, customer_id, boshlangich_tolov, oylik_tolov, qachon_tolashi) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      muddati,
      contract_starts,
      phone_id,
      total_price,
      customer_id,
      boshlangich_tolov,
      oylik_tolov,
      qachon_tolashi,
    ],
    (err, result) => {
      if (err) {
        console.error("Error adding new contract:", err);
        return res.status(500).json({
          message: "Error adding new contract",
          error: "Internal server error",
        });
      }

      res.status(201).json({
        message: "New contract added successfully",
        contractId: result.insertId,
      });
    }
  );
};

const getContractById = (req, res) => {
  const contractId = req.params.id;
  db.query(
    `SELECT * FROM contracts WHERE id =?`,
    [contractId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Contract not found" });
      }
      res.json(result[0]);
    }
  );
};

const updateContractById = (req, res) => {
  const contractID = req.params.id;
  const {
    muddati,
    contract_starts,
    phone_id,
    total_price,
    customer_id, // Fixed typo here
    boshlangich_tolov,
    oylik_tolov,
    qachon_tolashi,
  } = req.body;

  db.query(
    "UPDATE contracts SET muddati=?, contract_starts=?, phone_id=?, total_price=?, customer_id=?, boshlangich_tolov=?, oylik_tolov=?, qachon_tolashi=? WHERE id=?",
    [
      muddati,
      contract_starts,
      phone_id,
      total_price,
      customer_id,
      boshlangich_tolov,
      oylik_tolov,
      qachon_tolashi,
      contractID,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating contract:", err);
        return res.status(500).json({ message: "Error updating contract" });
      }
      if (result.affectedRows == 0) {
        return result.status(404).json({ message: "payment not found" });
      }

      res.json({
        message: "Contract updated successfully",
        contractID: contractID,
      });
    }
  );
};

const deleteContractById = (req, res) => {
  const contractId = req.params.id;
  db.query(`DELETE FROM contracts WHERE id =?`, [contractId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows == 0) {
      return result.status(404).json({ message: "ID not found" });
    }
    res.json({ message: "contract deleted successfully" });
  });
};

module.exports = {
  getContracts,
  addNewContract,
  getContractById,
  updateContractById,
  deleteContractById,
};
