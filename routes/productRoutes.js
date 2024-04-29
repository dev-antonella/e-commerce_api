const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/",productController.index);
router.get("/:id", productController.show);
router.post("/", isAdmin,productController.store);
router.patch("/:id", isAdmin,productController.update);
router.delete("/:id", isAdmin, productController.destroy);

module.exports = router;
