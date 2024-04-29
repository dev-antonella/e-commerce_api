const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAdmin = require("../middlewares/isAdmin");
const isUser = require("../middlewares/isUser")
const { expressjwt: checkJwt } = require("express-jwt");

router.use (checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

router.get("/", isAdmin,  userController.index);
router.get("/:id", isAdmin, isUser, userController.show);
router.post("/", userController.store);
router.patch("/:id", isUser, isAdmin, userController.update);
router.delete("/:id", isAdmin, isUser, userController.destroy);

module.exports = router;
