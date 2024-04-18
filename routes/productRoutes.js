const express = require("express");
const app = express();
const { Product } = require("../models");
const productController = require("../controllers/productController");

app.get("/", productController.index);
app.get("/:id", productController.show);
app.post("/", productController.store);
app.patch("/:id", productController.update);
app.delete("/:id", productController.destroy);

module.exports = app;
