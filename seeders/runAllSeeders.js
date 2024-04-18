require("dotenv").config(); //para que corran las variables
const userSeeder = require("./userSeeder");
const adminSeeder = require("./adminSeeders");
const categorySeeder = require("./categorySeeder");
const orderSeeder = require("./orderSeeders");
const productSeeder = require("./productSeeders");

adminSeeder();
userSeeder();
categorySeeder();
orderSeeder();
productSeeder();
console.log("The seeders ran!");
