const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAdmin = require("../middlewares/isAdmin");
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
const isUser = require("../middlewares/isUser")
const { expressjwt: checkJwt } = require("express-jwt");
=======
>>>>>>> 710197bbbf0bc9b69b02a59206408bba563cf42a
>>>>>>> Stashed changes

router.use (checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] })
);

router.get("/", isAdmin,  userController.index);
router.get("/:id", isAdmin, isUser, userController.show);
router.post("/", userController.store);
<<<<<<< HEAD
router.patch("/:id", isUser, isAdmin, userController.update);
router.delete("/:id", isUser, userController.destroy);
=======



router.get("/", isAdmin, userController.index);
router.get("/:id", userController.show);
router.patch("/:id", isAdmin,userController.update);
router.delete("/:id", userController.destroy);
>>>>>>> 710197bbbf0bc9b69b02a59206408bba563cf42a

module.exports = router;
