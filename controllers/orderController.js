<<<<<<< Updated upstream
=======
<<<<<<< HEAD
const { Order, Product, User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const orderController = {
    index: async (req, res) => {
        try {
            const orders = await Order.findAll();
            return res.json(orders);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error while fetching orders." });
        }
    },

    show: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);

            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
=======
>>>>>>> Stashed changes
const { Order, Product, User, OrderProducts } = require("../models");

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
      //const user Id = req.auth.id; No logre traer el userId del token, preguntar
      const order = req.body;
      
      const orderCreated = await Order.create(order);
      // orderCreated.userId = userId;
      // console.log(orderCreated);
      // orderCreated.save();
      
      for (const product of order.itemsList) {
        const productInDB = await Product.findByPk(product.id);
        if (!productInDB || productInDB.stock < product.qty) {
          return res.json({ message: "Oops, something went wrong." });
        }
        await OrderProducts.create({orderId:orderCreated.id,productId:product.id,quantity:product.quantity});
        productInDB.stock -= product.quantity;
        await productInDB.save();
      }
      return res.json({ message: "Order placed successfully." });
    } catch (err) {
      console.error(err);
      return res.json({ message: "Oops, something went wrong." });
    }
  },
>>>>>>> 710197bbbf0bc9b69b02a59206408bba563cf42a

            return res.json(order);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error while fetching order." });
        }
    },

    store: async (req, res) => {
        try {
            const order = req.body;

            for (const productInfo of order.itemsList) {
                const productInDB = await Product.findById(productInfo.id);
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
                return res.status(404).json({ message: "Order not found." });
            }

            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "Access denied: Only administrators can modify orders." });
            }
            
            if (address) order.address = address;
            if (status) order.status = status;
            
            await order.save();

            return res.send("Order modified successfully!");
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error while updating order." });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findByPk(id);

            if (!order) {
                return res.status(404).json({ message: "Order not found." });
            }

            if (req.user.role !== "admin") {
                return res.status(403).json({ message: "Access denied: Only administrators can delete orders." });
            }

            await order.destroy();

            return res.status(200).json({ message: "Order deleted successfully." });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error while deleting order." });
        }
    },
};

module.exports = orderController;
