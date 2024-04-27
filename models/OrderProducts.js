const { Model, DataTypes } = require("sequelize");

class OrderProducts extends Model {
  static initModel(sequelize) {
    OrderProducts.init(
      {
        quantity: {
          type: DataTypes.BIGINT,
        },
      },
      {
        sequelize,
        modelName: "orderProducts",
      }
    );
    return OrderProducts;
  }
}

module.exports = OrderProducts;
