const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const isAdmin = require("../middlewares/isAdmin");

router.post("/", userController.store);



router.get("/", isAdmin, userController.index);
router.get("/:id", userController.show);
router.patch("/:id", isAdmin,userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
