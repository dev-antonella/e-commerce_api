require("dotenv").config(); //para que corran las variables
const userSedeer = require("./userSedeers");
const adminSeeder = require("./adminSeeders");
const categorySeeder = require("./categorySeeders");
const orderSeeder = require("./orderSeeders");
const productSeeder = require("./productSeeders");

adminSeeder();
userSedeer();
categorySeeder();
orderSeeder();
productSeeder();
console.log("The seeders ran!");
