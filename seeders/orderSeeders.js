const { faker } = require("@faker-js/faker");
const { Order } = require("../models");

async function orderSeeder() {
    const orders = [];
    for (let i = 0; i < 19; i++) {
        // const itemsList = faker.commerce.product();
        const address = faker.location.streetAddress();
        const status = "Pending";
        const newOrder = {
            // itemsList,
            address,
            status,
            userId: i + 1,
        };
        orders.push(newOrder);
    }
    await Order.bulkCreate(orders);
    console.log("The order seeder ran!");
}

module.exports = orderSeeder;
