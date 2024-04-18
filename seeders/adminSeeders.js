const { faker } = require("@faker-js/faker");
const { Admin } = require("../models");
const admins = [];

async function adminSeeder() {
  const newadmin = {
    firstname: "Chapo",
    lastname: "Guzman",
    email: faker.internet.email({ firstName: firstname, lastname: lastname }),
    password: "1234",
  };
  admins.push(newadmin);

  for (let i = 0; i < 3; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const newadmin = {
      firstname,
      lastname,
      email: faker.internet.email({
        firstName: firstname,
        lastname: lastname,
        password: "1234",
      }),
    };
  }
  await Admin.bulkCreate(admins);

  console.log("The admin seeder ran!");
}

module.exports = adminSeeder;
