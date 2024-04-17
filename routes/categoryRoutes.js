const express = require("express");
const routes = express.Router();
const { Category } = require("../models");
const categoryController = require("../controllers/categoryController");
const router = require(".");

router.get("/", categoryController.index);
router.get("/:id", categoryController.show);
router.post("/", categoryController.store);
router.patch("/:id", categoryController.update);
router.delete("/:id", categoryController.destroy);

module.exports = router;
