const { Model, DataTypes } = require("sequelize");

class Product extends Model {
    static initModel(sequelize) {
        Product.init(
            {
                id: {
                    type: DataTypes.BIGINT, 
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
                    type: DataTypes.INTEGER,
                },
                stock: {
                    type: DataTypes.BIGINT,
                },
                featured: {
                    type: DataTypes.BOOLEAN,
                },
            },
            {
                sequelize,
                modelName: "product",
            }
        );
        return Product;
    }
}

module.exports = Product;
