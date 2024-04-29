const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.getToken);
router.post("/signup", authController.signup);
//router.post("/forgot-password", authController.forgotPassword);

module.exports = router;
