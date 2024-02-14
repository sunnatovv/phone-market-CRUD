const express = require("express");
require("dotenv").config();

const mainRouter = require("./routes/index");

const PORT = process.env.PORT;

const app = express();

//parse json bodies
app.use(express.json());
app.use(mainRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
