const { faker } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require("bcryptjs");

async function userSeeder() {
    const users = [];
    const hashedPassword = await bcrypt.hash("1234", 10);
    for (let i = 0; i < 20; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.firstName();
        const newUser = {
            firstname,
            lastname,
            email: faker.internet.email({
                firstName: firstname,
                lastName: lastname,
            }),
            phoneNumber: faker.phone.number(),
            password: hashedPassword,
        };
        users.push(newUser);
    }
    await User.bulkCreate(users);
    console.log("The users seeder ran!");
}

module.exports = userSeeder;
