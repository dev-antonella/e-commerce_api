const express = require("express");
const app = express();
const authController = require("../controllers/authController");

app.post("/", authController.getToken);

module.exports = app;
