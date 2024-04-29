const express = require("express");
const router = express.Router();
const orderProductsController = require("../controllers/orderProductsController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", isAdmin, orderProductsController.index,);
router.get("/:id", orderProductsController.show);
router.post("/", isAdmin, orderProductsController.store);
router.patch("/:id", isAdmin, orderProductsController.update);
router.delete("/:id", isAdmin, orderProductsController.destroy);

module.exports = router;
