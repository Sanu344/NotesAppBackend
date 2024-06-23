const mongoose = require("mongoose");

const joi = require("joi");

function validate_subject(body) {
  const schema = joi.object({
    subject: joi.string().required(),
    sub: joi.string(),
    user: joi.string().required(),
  });

  return schema.validate(body);
}

const schema = mongoose.Schema({
  subject: { type: String, required: true },
  sub: { type: String },
  user: { type: String, required: true },
});

const Subject = mongoose.model("subjects", schema);

module.exports = { Subject, validate_subject };
