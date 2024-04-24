const { expressjwt: checkJwt } = require("express-jwt");
const express = require("express");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const authRoutes = require("./authRoutes");
const isAdmin = require("../midllewares/isAdmin");
const router = express.Router();

router.use(express.json());

router.use(
  "/admins",
  checkJwt({ secret: "oneStringVerySecret", algorithms: ["HS256"] }),
  adminRoutes
);

router.use(
  "/order",
  checkJwt({ secret: "oneStringVerySecret", algorithms: ["HS256"] }),
  orderRoutes
);
router.use("/product", productRoutes);
router.use("/token", authRoutes);
router.use("/user", userRoutes);
router.use("/categoryRoutes", categoryRoutes);
module.exports = router;
