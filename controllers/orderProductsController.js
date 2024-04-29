const { Order, Product, User, OrderProducts } = require("../models");

const orderProductsController = {
  index: async (req, res) => {
    try {
      const ordersProducts = await OrderProducts.findAll();
      return res.json(ordersProducts);
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
      const order = await OrderProducts.findAll({ where: { orderId:id } });
                    
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
      console.log(order)
      const orderInDb = await Order.findByPk(order.id);
      if (orderInDb){
        for (const product of order.itemsList) {
          const productInDB = await Product.findByPk(product.id);
          if (!productInDB || productInDB.stock < product.quantity) {
            return res.json({ message: "Oops, something went wrong." });
          }
          
          await OrderProducts.create({orderId:order.id,productId:product.id,quantity:product.quantity});
          productInDB.stock -= product.quantity;
          await productInDB.save();
        }
        return res.json({ message: "Order placed successfully." });
      }else{
        return res.json({ message: "Order don't exists" });
      }
    } catch (err) {
      console.error(err);
      return res.json({ message: "Oops, something went wrong." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { quantity, idPrd } = req.body;

      const orderProducts = await OrderProducts.findOne({ where: { orderId:id,productId:idPrd } });

      if (!orderProducts) {
        return res.status(404).json({ message: "orderProducts not found" });
      }

      if (quantity) orderProducts.quantity = quantity;

      await orderProducts.save();

      return res.send("Order modified successfully!");
    } catch (error) {
      console.error("Error updating orderProducts:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while updating orderProducts" });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const orderProducts = await OrderProducts.findAll({ where: { orderId:id} });

      if (!orderProducts) {
        return res.status(404).json({ message: "orderProducts not found" });
      }
      for (const product of orderProducts) {
        await product.destroy();
      }
      return res.status(200).json({ message: "orderProducts deleted successfully" });
    } catch (error) {
      console.error("Error deleting orderProducts:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while deleting orderProducts" });
    }
  },
};

module.exports = orderProductsController;
