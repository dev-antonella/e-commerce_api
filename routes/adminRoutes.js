const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const isAdmin = require("../middlewares/isAdmin");

router.get("/", isAdmin, adminController.index);
router.get("/:id", isAdmin, adminController.show);
router.post("/", isAdmin, adminController.store);
router.patch("/:id", isAdmin, adminController.update);
router.delete("/:id", isAdmin,adminController.destroy);

module.exports = router;
