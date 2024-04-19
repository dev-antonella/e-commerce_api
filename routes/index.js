const { expressjwt: checkJwt } = require("express-jwt");
const express = require("express");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const authRoutes = require("./authRoutes");
const router = express.Router();

router.use(express.json());

router.use(
  "/admins",
  checkJwt({ secret: "OneStringVerySecret", algorithms: ["HS256"] }), isAdmin,
  adminRoutes
);

router.use("/order", orderRoutes);
router.use("/product", productRoutes);
router.use("/tokens", authRoutes);
router.use("/user", userRoutes);
router.use("/categoryRoutes", categoryRoutes);
module.exports = router;
