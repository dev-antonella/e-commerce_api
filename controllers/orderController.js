const { Order, Product, User } = require("../models");

const orderController = {
  index: async (req, res) => {
    try {
      const orders = await Order.findAll();
      return res.json(orders);
    } catch (error) {
      console.error("Error fetching order:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while fetching orders" });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      console.log(order);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      return res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while fetching order" });
    }
  },

  store: async (req, res) => {
    try {
      const order = req.body;

      for (const productInfo of order.itemsList) {
        const productInDB = await Order.findById(productInfo.id);
        if (!productInDB || productInDB.stock < productInfo.qty) {
          return res.json({ message: "Oops, something went wrong." });
        }

        productInDB.stock -= productInfo.qty;
        await productInDB.save();
      }

      await Order.create(order);
      return res.json({ message: "Order placed successfully." });
    } catch (err) {
      console.error(err);
      return res.json({ message: "Oops, something went wrong." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { address, status } = req.body;

      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // if (productsList) order.name = productsList;
      if (address) order.address = address;
      if (status) order.status = status;

      await order.save();

      return res.send("Order modified successfully!");
    } catch (error) {
      console.error("Error updating order:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while updating order" });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.destroy();

      return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while deleting order" });
    }
  },
};

module.exports = orderController;
