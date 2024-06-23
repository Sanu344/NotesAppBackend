const mongoose = require("mongoose");
const joi = require("joi");

function validate(body) {
  const schema = joi.object({
    name: joi.string().min(5),
    email: joi.string().required(true).email(),
    password: joi.string().required(true).min(8).max(225),
  });
}

const schema = mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, maxlength: 1024 },
});
const user = mongoose.model("Users", schema);

module.exports = { user, validate };
