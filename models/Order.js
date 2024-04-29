const { Model, DataTypes } = require("sequelize");

class Order extends Model {
  static initModel(sequelize) {
    Order.init(
      {
        id: {
          type: DataTypes.BIGINT, 
          primaryKey: true,
          autoIncrement: true,
        },
        address: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM,
          values: ["pending", "rejected", "processing", "shipped", "delivered"],
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
  async getProducts() {
    return await this.getProducts(); // Utiliza la asociación definida en tu modelo
  }
}

Order.belongsToMany(Product, { through: "OrderProducts" });
Product.belongsToMany(Order, { through: "OrderProducts" });


module.exports = Order;
