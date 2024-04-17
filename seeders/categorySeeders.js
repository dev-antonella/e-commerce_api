const { faker } = require("@faker-js/faker");
const { category } = require ("../models");

async function categorySeeder() {
    for (let i = 0; i < 20; i++){
const name = faker.commerce.category();
const description = faker.lorem.paragraph(5)
const newcategory ={
    name,
    description,
};
await category.create(newcategory);
    }
    console.log("The category seeders ran!")
}

module.exports = categorySeeder;