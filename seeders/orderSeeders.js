const { faker } = require("@faker-js/faker");
const { Order } = require("../models");

async function orderSeeder() {
  const orders = [];
  for (let i = 0; i < 20; i++) {
    const itemsList = faker.commerce.product();
    const status = "Pending";
    const newOrder = {
      itemsList,
      status,
    };
    orders.push(newOrder);
  }
  await Order.bulkCreate(orders);
  console.log("The order seeder ran!");
}

module.exports = orderSeeder;
