const express = require("express");
const routes = express.Router();
const { User } = require("../models");
const userController = require("../controllers/userController");
const router = require(".");

router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
