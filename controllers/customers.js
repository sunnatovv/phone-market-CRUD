const db = require("../config/db");

const getCustomers = (req, res) => {
  db.query("SELECT * FROM customers", (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Internal server Error" });
    }
    console.log(fields);
    res.json(result);
  });
};

const addNewCustomer = (req, res) => {
  const {
    name,
    surname,
    phone,
    number,
    address,
    passport_raqami,
    yoshi,
    card_number,
    fuqaroligi,
  } = req.body;
  db.query(
    "INSERT INTO customers (name,surname,phone,number,address,passport_raqami,yoshi,card_number,fuqaroligi) VALUES(?,?,?,?,?,?,?,?,?)",
    [
      name,
      surname,
      phone,
      number,
      address,
      passport_raqami,
      yoshi,
      card_number,
      fuqaroligi,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error adding new customer!",
          err: "Internal server Error",
        });
      }
      res.status(201).json({
        message: "New customer added successfully",
        customerId: result.insertId,
      });
    }
  );
};

const getCustomerById = (req, res) => {
  const customerId = req.params.id;
  db.query(
    `SELECT * FROM customers WHERE id =?`,
    [customerId],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json(result[0]);
    }
  );
};

const updateCustomerById = (req, res) => {
  const customerID = req.params.id;
  const {
    name,
    surname,
    phone,
    number,
    address,
    passport_raqami,
    yoshi,
    card_number,
    fuqaroligi,
  } = req.body;
  db.query(
    "UPDATE customers SET name=?, surname=?, phone=?, number=?, address=?,passport_raqami=?,yoshi=?,card_number=?,fuqaroligi=?, where id=?",
    [
      name,
      surname,
      phone,
      number,
      address,
      passport_raqami,
      yoshi,
      card_number,
      fuqaroligi,
      customerID,
    ],
    (err, result) => {
      if (err) {
        console.log("Error updating table");
        return res.status(500).json({ message: "Error updating table" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "ID not found" });
      }
      res.json({
        message: "Customer updated successfully",
        customerID: customerID,
      });
    }
  );
};

const deleteCustomerById = (req, res) => {
  const customerId = req.params.id;
  db.query(`DELETE FROM customers WHERE id =?`, [customerId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (res.affectedRows == 0) {
      return result.status(404).json({ message: "ID not found" });
    }
    res.json({ message: "Customer deleted successfully" });
  });
};

module.exports = {
  getCustomers,
  addNewCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
