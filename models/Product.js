const { Model, DataTypes } = require("sequelize");

class Product extends Model {
  static initModel(sequelize) {
    Product.init(
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
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        picture: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.NUMBER,
        },
        stock: {
          type: DataTypes.NUMBER,
        },
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        featured: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Product",
      }
    );
    return Product;
  }
}

module.exports = Product;
