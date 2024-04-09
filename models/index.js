const { Sequelize, Model, DataTypes } = require("sequelize");

class Event extends Model {
  static initModel(sequelize) {
    Event.init(
      {
        id: {
          type: DataTypes.BIGINT, // Notar que si bien esto en BD se guarda como BIGINT (8 bytes), Sequelize lo retorna como String, ya que JavaScript no lo puede representar.
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "event",
      }
    );
    return Event;
  }
}

const sequelize = new Sequelize("example_class_db", "root", "rootroot", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  logging: false,
});

Event.initModel(sequelize);

module.exports = {
  sequelize,
  Event,
};
