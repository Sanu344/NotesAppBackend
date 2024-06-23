const mongoose = require("mongoose");

const joi = require("joi");

function validateTopic(body) {
  const schema = joi.object({
    user: joi.string().required(),
    title: joi.string().required(),
    tit: joi.string(),
    subject: joi.string().required(),
    content: joi.string().required(),
  });

  return schema.validate(body);
}

const schema = mongoose.Schema({
  user: { type: String, required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  tit: { type: String },
  content: { type: String, required: true },
});
const Topic = mongoose.model("topics", schema);

module.exports = { Topic, validateTopic };
