const { faker } = require("@faker-js/faker");
const { Admin } = require("../models");
const bcrypt = require("bcryptjs");
const admins = [];

async function adminSeeder() {
    const hashedPassword = await bcrypt.hash("1234", 10);
    const adminRoot = {
        firstname: "Chapo",
        lastname: "Guzman",
        email: faker.internet.email({
            firstName: "Chapo",
            lastName: "Guzman",
        }),
        password: hashedPassword,
    };
    admins.push(adminRoot);

    for (let i = 0; i < 3; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const email = faker.internet.email({
            firstName: firstname,
            lastName: lastname,
        });
        const password = faker.internet.password();
        const newadmin = {
            firstname,
            lastname,
            email,
            password: hashedPassword,
        };
        admins.push(newadmin);
    }
    await Admin.bulkCreate(admins);

    console.log("The admin seeder ran!");
}

module.exports = adminSeeder;
