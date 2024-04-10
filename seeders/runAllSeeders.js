require("dotenv").config(); //para que corran las variables
const userSeeder = require("./userSeeder");

userSeeder();
console.log("The seeders ran!")