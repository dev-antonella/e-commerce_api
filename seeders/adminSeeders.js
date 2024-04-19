const { faker } = require("@faker-js/faker");
const { Admin } = require("../models");
const admins = [];

async function adminSeeder() {
  const adminRoot = {
    firstname: "Chapo",
    lastname: "Guzman",
    email: faker.internet.email({ firstName: firstname, lastname: lastname }),
    password: "1234",
  };
  admins.push(adminRoot);

  for (let i = 0; i < 3; i++) {
    const firstname = faker.person.firstName();
    const lastname = faker.person.lastName();
    const email = faker.internet.email({
      firstName: firstname,
      lastname: lastname,
    });
    const password = faker.internet.password();
    const newadmin = {
      firstname,
      lastname,
      email,
      password,
    };
    admins.push(newadmin);
  }
  await Admin.bulkCreate(admins);

  console.log("The admin seeder ran!");
}

module.exports = adminSeeder;
