require("dotenv").config();
const { sequelize } = require("./models");

async function createTables() {
    await sequelize.sync({ force: true });
    console.log("The tables has been created!");
    process.exit();
}

createTables();
