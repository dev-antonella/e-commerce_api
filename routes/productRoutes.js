const express = require("express");
const routes = express.Router();
const { Product } = require("../models");
const productController = require("../controllers/productController");
const router = require(".");

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.store);
router.patch("/:id", productController.update);
router.delete("/:id", productController.destroy);

module.exports = router;
