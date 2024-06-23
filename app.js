const express = require("express");
const app = express();
const cors = require("cors");

const noteapp = require("./routes/noteapp");

//middle wares
app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.use("/api/app/", noteapp);

module.exports = app;
