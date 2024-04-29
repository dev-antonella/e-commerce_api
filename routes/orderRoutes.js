const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", isAdmin, orderController.index,);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.patch("/:id", orderController.update);
router.delete("/:id", orderController.destroy);

module.exports = router;
