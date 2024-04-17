const { faker } = require("@faker-js/faker");
const { product } = require("../models");


async function productSeeder() {
  for (let i = 0; i < 20; i++) {
    const firstname = faker.commerce.produtname();
    const description = faker.commerce.productDescription();
    const price = faker.commerce.price;
    const newproduct = {
      firstname,
      lastname,
      email: faker.internet.email({ firstName: firstname, lastName: lastname }),
      phoneNumber: faker.phone.number(),
      password: "1234",
    };
    await product.create(newproduct);
  }
  console.log("The products seeders ran!")
}

module.exports = productSeeder;


