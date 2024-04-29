require("dotenv").config();
const { expressjwt: checkJwt } = require("express-jwt");
const express = require("express");
const userRoutes = require("./userRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");
const authRoutes = require("./authRoutes");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.use(express.json());

router.use(
    "/admins",
    checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
    isAdmin,
    adminRoutes
);

router.use(
    "/orders",
    checkJwt({ secret: process.env.TOKEN_SECRET, algorithms: ["HS256"] }),
    orderRoutes
);
router.use("/products", productRoutes);
router.use("/tokens", authRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);
module.exports = router;
