require("dotenv").config(); //para que corran las variables
const userSeeder = require("./userSeeder");
const adminSeeder = require("./adminSeeders");



adminSeeder()
userSeeder()
console.log("The seeders ran!")

