const { faker } = require("@faker-js/faker");
const { Admin } = require("../models");

async function adminSeeder() {
    for (let i = 0; i < 3; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.internet.userName();
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
        await Admin.create(newadmin);
    }
    const newadmin = {
        firstname: "Chapo",
        lastname: "Guzman",
        email: faker.internet.email({ firstName: firstname, lastname: lastname }),
        password: "1234",
    };
    await Admin.create(newadmin);

    console.log("The admin seeders ran!");
}

module.exports = adminSeeder;
