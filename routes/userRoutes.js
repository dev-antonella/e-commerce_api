const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.store);



router.get("/", userController.index);
router.get("/:id", userController.show);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);

module.exports = router;
