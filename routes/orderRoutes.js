const express = require("express");
const app = express();
const orderController = require("../controllers/orderController");

app.get("/", orderController.index);
app.get("/:id", orderController.show);
app.post("/", orderController.store);
app.patch("/:id", orderController.update);
app.delete("/:id", orderController.destroy);

module.exports = app;
