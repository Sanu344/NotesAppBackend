const express = require("express");
const noteapp = express.Router();
const { Topic, validateTopic } = require("../models/topic");
const { user } = require("../models/user");
const { Subject, validate_subject } = require("../models/subjects");
noteapp.post("/notes/save/", async (req, res) => {

  const { error } = validateTopic(req.body);
  if (error)
    return res.send({
      status: false,
      message: error.details[0].message,
      data: req.body,
    });

  try {
    const data = await Topic.findOne({
      tit: req.body.title.toUpperCase().trim(),
      user: "Choti",
    });
    if (data)
      return res.send({
        status: false,
        message: "This topic is already present",
      });
  } catch (error) {
    res.send({
      status: false,
      message: "could not add Topic " + error.message,
    });
  }

  const { user, subject, title, content } = req.body;
  const topic = new Topic({
    user: user,
    subject: subject,
    title: title,
    tit: title.toUpperCase(),
    content: content,
  });

  try {
    const data = await topic.save();
    res.send({ status: true, message: "New notes added" });
  } catch (error) {
    res.send({ status: false, message: error.message });
  }
});

noteapp.get("/notes/", async (req, res) => {
  try {
    const data = await Topic.find(
      { user: "Choti" },
      { title: 1, subject: 1, content: 1, _id: 0 }
    );
    res.send({ status: true, data: data });
  } catch (error) {
    res.send({
      status: false,
      message: "coud not fetch data, error: " + error.message,
    });
  }
});

noteapp.get("/subjects/", async (req, res) => {
  try {
    const data = await Subject.find(
      { user: "Choti" },
      { subject: 1, user: 1, _id: 0 }
    );
    const arr = [];
    data.forEach((element) => {
      arr.push(element.subject);
    });

    res.send({ status: true, data: arr });
  } catch (error) {
    res.send({
      status: false,
      message: "coud not fetch data, error: " + error.message,
    });
  }
});

noteapp.post("/subjects/save", async (req, res) => {
  const { error } = validate_subject(req.body);
  if (error)
    return res.send({ status: false, message: error.details[0].message });

  try {
    const data = await Subject.findOne({
      sub: req.body.subject.toUpperCase().trim(),
      user: req.body.user,
    });
    if (data)
      return res.send({ status: false, message: "subject already present" });
  } catch (error) {
    res.send({
      status: false,
      message: "could not add subject error:" + error.message,
    });
  }

  const subject = new Subject({
    subject: req.body.subject.trim(),
    sub: req.body.subject.toUpperCase().trim(),
    user: req.body.user,
  });

  try {
    const data = await subject.save();
    res.send({ status: true, message: "new subject added" });
  } catch (error) {
    res.send({
      status: false,
      message: "could not add subject " + error.message,
    });
  }
});

module.exports = noteapp;
