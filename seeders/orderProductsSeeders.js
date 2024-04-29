const { faker } = require("@faker-js/faker");
const { OrderProducts } = require("../models");

async function orderProductsSeeder() {
    const orders = [];
    for (let i = 1; i < 11; i++) {
        for (let j = 1; j < 11; j++) {
            const newOrder = {
                quantity : Math.random()*10,
                orderId: i,
                productId: j,
            };
            orders.push(newOrder);
        }
    }
    await OrderProducts.bulkCreate(orders);
    console.log("The order seeder ran!");
}

module.exports = orderProductsSeeder;
