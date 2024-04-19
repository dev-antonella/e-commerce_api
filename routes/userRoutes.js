const express = require("express");
const app = express();
const userController = require("../controllers/userController");

app.get("/", userController.index);
app.get("/:id", userController.show);
app.post("/", userController.store);
app.patch("/:id", userController.update);
app.delete("/:id", userController.destroy);

module.exports = app;
