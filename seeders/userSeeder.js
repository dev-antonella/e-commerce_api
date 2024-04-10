const { faker } = require("@faker-js/faker");
const { User } = require("../models");

async function userSeeder() {
  for (let i = 0; i < 20; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.firstName();
    const newUser = {
      firstname,
      lastname,
      email: faker.internet.email({ firstName: firstname, lastName: lastname }),
      phoneNumber: faker.phone.number(),
      password: "1234",
    };
    await User.create(newUser);
  }
  console.log("The users seeders ran!")
}

module.exports = userSeeder;
