const { faker } = require("@faker-js/faker");
const { Category } = require("../models");

async function categorySeeder() {
  const cateogrie = [];
  for (let i = 0; i < 20; i++) {
    const name = "Category";
    const newcategory = {
      name,
    };
    cateogrie.push(newcategory);
  }
  await Category.bulkCreate(cateogrie);

  console.log("The category seeder ran!");
}

module.exports = categorySeeder;
