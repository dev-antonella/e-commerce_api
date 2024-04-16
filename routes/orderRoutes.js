const express = require("express");
const routes = express.Router();
const { Order } = require("../models");
const orderController = require("../controllers/orderController");
const router = require(".");

router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.destroy);

module.exports = router;
