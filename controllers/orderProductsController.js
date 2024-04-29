const { Order, Product, User, OrderProducts } = require("../models");
const { sequelize } = require("../models");

const orderProductsController = {
  index: async (req, res) => {
    try {
      const ordersProducts = await OrderProducts.findAll();
      return res.json(ordersProducts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while fetching order products." });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const orderProducts = await OrderProducts.findAll({ where: { orderId: id } });

      if (!orderProducts || orderProducts.length === 0) {
        return res.status(404).json({ message: "Order products not found." });
      }

      return res.json(orderProducts);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while fetching order products." });
    }
  },

  store: async (req, res) => {
    try {
      const order = req.body;
      const orderInDb = await Order.findByPk(order.id);

      if (!orderInDb) {
        return res.status(404).json({ message: "Order does not exist." });
      }

      const products = await Product.findAll({
        where: {
          id: { [sequelize.Op.in]: order.itemsList.map(item => item.id) }
        }
      });

      const insufficientStock = products.find(product => {
        const item = order.itemsList.find(item => item.id === product.id);
        return !product || product.stock < item.quantity;
      });

      if (insufficientStock) {
        return res.status(400).json({ message: "Insufficient stock for one or more products." });
      }

      const transaction = await sequelize.transaction();

      try {
        for (const item of order.itemsList) {
          const product = products.find(product => product.id === item.id);
          product.stock -= item.quantity;
          await product.save({ transaction });

          await OrderProducts.create({
            orderId: order.id,
            productId: item.id,
            quantity: item.quantity
          }, { transaction });
        }

        await transaction.commit();
        return res.json({ message: "Order placed successfully." });
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while placing order." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity, idPrd } = req.body;

      const orderProducts = await OrderProducts.findOne({ where: { orderId: id, productId: idPrd } });

      if (!orderProducts) {
        return res.status(404).json({ message: "Order products not found." });
      }

      if (quantity) {
        orderProducts.quantity = quantity;
        await orderProducts.save();
      }

      return res.json({ message: "Order modified successfully." });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while updating order products." });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const orderProducts = await OrderProducts.findAll({ where: { orderId: id } });

      if (!orderProducts || orderProducts.length === 0) {
        return res.status(404).json({ message: "Order products not found." });
      }

      const transaction = await sequelize.transaction();

      try {
        for (const product of orderProducts) {
          await product.destroy({ transaction });
        }

        await transaction.commit();
        return res.status(200).json({ message: "Order products deleted successfully." });
      } catch (err) {
        await transaction.rollback();
        throw err;
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while deleting order products." });
    }
  },
};

module.exports = orderProductsController;