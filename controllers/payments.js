const db = require("../config/db");

const getPayments = (req, res) => {
  db.query("SELECT * FROM payments", (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Internal server Error" });
    }
    console.log(fields);
    res.json(result);
  });
};

const addNewPayment = (req, res) => {
  const { tolov_turi, tolov_vaqti, tarif, contract_id } = req.body;
  db.query(
    "INSERT INTO payments (tolov_turi, tolov_vaqti, tarif, contract_id) VALUES(?,?,?,?)",
    [tolov_turi, tolov_vaqti, tarif, contract_id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error adding new payments!",
          err: "Internal server Error",
        });
      }
      res.status(201).json({
        message: "New Payment added successfully",
        paymentId: result.insertId,
      });
    }
  );
};

const getPaymentById = (req, res) => {
  const paymentId = req.params.id;
  db.query(`SELECT * FROM payments WHERE id =?`, [paymentId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(result[0]);
  });
};

const updatePaymentById = (req, res) => {
  const paymentID = req.params.id;
  const { tolov_turi, tolov_vaqti, tarif, contract_id } = req.body;
  db.query(
    "UPDATE payments SET tolov_turi=?,tolov_vaqti=?,tarif=?,contract_id=? where id=?",
    [tolov_turi, tolov_vaqti, tarif, contract_id, paymentID],
    (err, result) => {
      if (err) {
        console.log("Error updating table");
        return res.status(500).json({ message: "Error updating table" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "not found" });
      }
      res.json({
        message: "payment updated successfully",
        paymentID: paymentID,
      });
    }
  );
};

const deletePaymentById = (req, res) => {
  const paymentId = req.params.id;
  db.query(`DELETE FROM payments WHERE id =?`, [paymentId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows == 0) {
      return result.status(404).json({ message: " ID not found" });
    }
    res.json({ message: "payment deleted successfully" });
  });
};

module.exports = {
  getPayments,
  addNewPayment,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
};
