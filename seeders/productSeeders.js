const { faker } = require("@faker-js/faker");
const { Product } = require("../models");

async function productSeeder() {
  const products = [];
  for (let i = 0; i < 20; i++) {
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const pics = faker.image.urlPicsumPhotos();
    const price = faker.commerce.price();
    const stock = faker.number.bigInt();
    const featured = false;

    const newProduct = {
      name,
      description,
      pics,
      price,
      stock,
      featured,
    };
    products.push(newProduct);
  }
  await Product.bulkCreate(products);
  console.log("The product seeder ran!");
}

module.exports = productSeeder;
