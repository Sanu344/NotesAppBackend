const mongoose = require("mongoose");
const express = require("express");
const app = require("./app");

const port = process.env.PORT || 5000;

mongoose
  .connect("mongodb://localhost/Notes")
  .then(() => {
    console.log("conneceted to database");
    app.listen(port, () => console.log("listening to port", port));
  })
  .catch((e) => console.log("could not connect to data base error: ", e));
