const express = require("express");
const router = express.Router();
const { Event } = require("../models/index");

router.get("/events", async (req, res) => {
  const events = await Event.findAll();
  res.json(events);
});

router.get("/events/:id", async (req, res) => {
  const event = await Event.findByPk(req.params.id);
  res.json(event);
});

router.post("/events", async (req, res) => {
  console.log(req.body);
  const event = await Event.create({
    name: req.body.name,
    date: req.body.date,
    description: req.body.description,
  });

  res.send(event);
});

router.delete("/events/:id", async (req, res) => {
  const idP = req.params.id;
  const event = await Event.findByPk(idP);

  if (!event) {
    res.json({ message: "Evento no encontrado", Status: 404 });
  } else {
    await event.destroy();
    res.json({ message: "Evento eliminado correctamente", Status: 200 });
  }
});

router.patch("/events/:id", async (req, res) => {
  const idP = req.params.id;
  const event = await Event.findByPk(idP);

  if (!event) {
    res.status(404).json({ message: "El evento no existe" });
  } else {
    const body = req.body;

    if (body.name) {
      event.name = body.name;
    }

    if (body.date) {
      event.date = body.date;
    }

    if (body.description) {
      event.description = body.description;
    }

    await event.save();
    res.status(200).json({ message: "Evento actualizado" });
  }
});

module.exports = router;
