const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/",productController.index);
router.get("/:id", productController.show);
<<<<<<< Updated upstream
router.post("/", isAdmin,productController.store);
router.patch("/:id", isAdmin,productController.update);
=======
<<<<<<< HEAD
router.post("/", isAdmin, productController.store);
router.patch("/:id", isAdmin, productController.update);
=======
router.post("/", isAdmin,productController.store);
router.patch("/:id", isAdmin,productController.update);
>>>>>>> 710197bbbf0bc9b69b02a59206408bba563cf42a
>>>>>>> Stashed changes
router.delete("/:id", isAdmin, productController.destroy);

module.exports = router;
