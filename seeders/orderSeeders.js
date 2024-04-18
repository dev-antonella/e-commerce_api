const { faker } = require("@faker-js/faker");
const { order } = require ("../models");

async function orderSeeder() {
    for (let i = 0; i < 20; i++){
const name = faker.commerce.order();
const description = faker.lorem.paragraph(5)
const neworder ={
    name,
    description,
};
}
await order.bulkCreate(neworder);
    console.log("The order seeders ran!")
}

module.exports = orderSeeder;