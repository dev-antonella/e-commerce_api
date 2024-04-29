const { faker } = require("@faker-js/faker");
const { Category } = require("../models");

async function categorySeeder() {
  const cateogries = [];
  for (let i = 0; i < 20; i++) {
    const name = "Category";
    const newcategory = {
      name,
    };
    cateogrie.push(newcategory);
  }
  await Category.bulkCreate(cateogries);

  console.log("The category seeder was run!");
}

module.exports = categorySeeder;
