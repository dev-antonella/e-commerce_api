require("dotenv").config(); //para que corran las variables
const userSeeder = require("./userSeeders");
const adminSeeder = require("./adminSeeders");
const categorySeeder = require("./categorySeeders");
const orderSeeder = require("./orderSeeders");
const productSeeder = require("./productSeeders");
const orderProductsSeeder = require("./orderProductsSeeders")

runSeeders();

async function runSeeders() {
    await userSeeder();
    await adminSeeder();
    await categorySeeder();
    await productSeeder();
    await orderSeeder();
    await orderProductsSeeder();

    console.log("The seeders ran");
}
