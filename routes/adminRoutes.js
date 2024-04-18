const express = require("express");
const app = express();
const { Admin } = require("../models");
const adminController = require("../controllers/adminController");

app.get("/", adminController.index);
app.get("/:id", adminController.show);
app.post("/", adminController.store);
app.patch("/:id", adminController.update);
app.delete("/:id", adminController.destroy);

module.exports = app;
