const express = require("express");
const routes = express.Router();
const { Admin } = require("../models");
const adminController = require("../controllers/adminController");
const router = require(".");

router.get("/", adminController.index);
router.get("/:id", adminController.show);
router.post("/", adminController.store);
router.patch("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
