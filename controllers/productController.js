const { Product } = require("../models");

const productController = {
  index: async (req, res) => {
    try {
      const products = await Product.findAll();
      return res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while fetching products" });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while fetching product" });
    }
  },

  store: async (req, res) => {
    try {
      const { name, description, picture, price, stock, featured, categoryId } = req.body;
      await Product.create({ name, description, picture, price, stock, featured, categoryId });
      return res.send("Product created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while creating user" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, pics, price, stock, featured, categoryId } = req.body;

      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (name) product.name = name;
      if (description) product.description = description;
      if (pics) product.pics = pics;
      if (price) product.price = price;
      if (stock) product.stock = stock;
      if (featured) product.featured = featured;
      if (categoryId) product.categoryId = categoryId;

      await product.save();

      return res.send("Product modified successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while updating product" });
    }
  },
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      await product.destroy();

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while deleting product" });
    }
  },
};

module.exports = productController;
