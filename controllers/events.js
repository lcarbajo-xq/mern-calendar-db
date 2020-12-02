const { response } = require("express");
const Event = require("../models/Event");

const getEvents = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "Get Events",
  });
};

const addEvent = async (req, res = response) => {
  const eventNew = new Event(req.body);

  try {
    eventNew.user = req.uid;

    const eventDB = await eventNew.save();

    res.status(201).json({
      ok: "true",
      event: eventDB,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Contact the administrator",
    });
  }
};

const updateEvent = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "Update Events",
  });
};

const deleteEvent = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "Delete Events",
  });
};

module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent,
};
