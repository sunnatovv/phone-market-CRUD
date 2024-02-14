const db = require("../config/db");

const getPhones = (req, res) => {
  db.query("SELECT * FROM phones", (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Internal server Error" });
    }
    console.log(fields);
    res.json(result);
  });
};

const addNewPhone = (req, res) => {
  const { narxi, models_id, harakteristikasi, imei, ram, rom, camera, color } =
    req.body;
  db.query(
    "INSERT INTO phones (narxi,models_id,harakteristikasi,imei,ram,rom,camera,color) VALUES(?,?,?,?,?,?,?,?)",
    [narxi, models_id, harakteristikasi, imei, ram, rom, camera, color],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error adding new phones!",
          err: "Internal server Error",
        });
      }
      res.status(201).json({
        message: "New Phone added successfully",
        phoneId: result.insertId,
      });
    }
  );
};

const getPhoneById = (req, res) => {
  const phoneId = req.params.id;
  db.query(`SELECT * FROM phones WHERE id =?`, [phoneId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Phone not found" });
    }
    res.json(result[0]);
  });
};

const updatePhoneById = (req, res) => {
  const phoneID = req.params.id;
  const { narxi, models_id, harakteristikasi, imei, ram, rom, camera, color } =
    req.body;
  db.query(
    "UPDATE phones SET narxi=?,models_id=?,harakteristikasi=?,imei=?,ram=?,rom=?,camera=?,color=? where id=?",
    [
      narxi,
      models_id,
      harakteristikasi,
      imei,
      ram,
      rom,
      camera,
      color,
      phoneID,
    ],
    (err, result) => {
      if (err) {
        console.log("Error updating table");
        return res.status(500).json({ message: "Error updating table" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: "iD not found" });
      }
      res.json({
        message: "phone updated successfully",
        phoneID: phoneID,
        data: result.affectedRows,
      });
    }
  );
};

const deletePhoneById = (req, res) => {
  const phoneId = req.params.id;
  db.query(`DELETE FROM phones WHERE id =?`, [phoneId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "payment not found" });
    }
    res.json({ message: "phone deleted successfully" });
  });
};

module.exports = {
  getPhones,
  addNewPhone,
  getPhoneById,
  updatePhoneById,
  deletePhoneById,
};
