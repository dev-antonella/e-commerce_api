const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.BIGINT, // Notar que si bien esto en BD se guarda como BIGINT (8 bytes), Sequelize lo retorna como String, ya que JavaScript no lo puede representar.
          primaryKey: true,
          autoIncrement: true,
        },
        // itemsList: {
        //   type: DataTypes.STRING,
        //   allowNull: false,
        // },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "order",
      }
    );
    return Order;
  }
}

module.exports = Order;
