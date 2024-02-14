const db = require("../config/db");

const getModels = (req, res) => {
  db.query("SELECT * FROM module", (err, result, fields) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ err: "Internal server Error" });
    }
    console.log(fields);
    res.json(result);
  });
};

const addNewModel = (req, res) => {
  const { name } = req.body;
  db.query("INSERT INTO module (name) VALUES(?)", [name], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Error adding new models!",
        err: "Internal server Error",
      });
    }
    res.status(201).json({
      message: "New Model added successfully",
      modelId: result.insertId,
    });
  });
};

const getModelById = (req, res) => {
  const modelId = req.params.id;
  db.query(`SELECT * FROM module WHERE id =?`, [modelId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Model not found" });
    }
    res.json(result[0]);
  });
};

const updateModelById = (req, res) => {
  const modelID = req.params.id;
  const { name } = req.body;
  db.query(
    "UPDATE module SET name=? where id=?",
    [name, modelID],
    (err, result) => {
      if (err) {
        console.log("Error updating table");
        return res.status(500).json({ message: "Error updating table" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ message: " not found" });
      }

      res.json({
        message: "model updated successfully",
        modelID: modelID,
      });
    }
  );
};

const deleteModelrById = (req, res) => {
  const modelId = req.params.id;
  db.query(`DELETE FROM module WHERE id =?`, [modelId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ message: "not found" });
    }
    res.json({ message: "model deleted successfully" });
  });
};

module.exports = {
  getModels,
  addNewModel,
  getModelById,
  updateModelById,
  deleteModelrById,
};
