const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const isAdmin = require("../middlewares/isAdmin");
const isUser = require("../middlewares/isUser")

router.get("/", isAdmin, orderController.index,);
router.get("/:id", isAdmin, isUser, orderController.show);
router.post("/", isAdmin, isUser, orderController.store);
router.patch("/:id", isAdmin, isUser, orderController.update);
router.delete("/:id", isAdmin, isUser, orderController.destroy);

module.exports = router;
