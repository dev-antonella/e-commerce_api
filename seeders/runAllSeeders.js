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
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    console.log("The seeders was ran!");
=======
>>>>>>> Stashed changes
    await orderSeeder();
    await orderProductsSeeder();

    console.log("The seeders ran");
>>>>>>> 710197bbbf0bc9b69b02a59206408bba563cf42a
}
