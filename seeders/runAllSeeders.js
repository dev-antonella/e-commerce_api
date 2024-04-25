require("dotenv").config(); //para que corran las variables
const userSeeder = require("./userSeeders");
const adminSeeder = require("./adminSeeders");
const categorySeeder = require("./categorySeeders");
const orderSeeder = require("./orderSeeders");
const productSeeder = require("./productSeeders");

runSeeders();

async function runSeeders() {
    await userSeeder();
    await adminSeeder();
    await categorySeeder();
    await orderSeeder();
    await productSeeder();
    console.log("The seeders ran");
}
