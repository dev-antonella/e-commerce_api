const { Category } = require("../models");

// GET
const categoryController = {
  index: async (req, res) => {
    try {
      const category = await Category.findAll();
      return res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while fetching category" });
    }
  },

  // GET BY ID
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      return res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while fetching category" });
    }
  },

  // POST
  store: async (req, res) => {
    try {
      const { nameCategory } = req.body;
      await Category.create({ nameCategory });
      return res.send("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while creating category" });
    }
  },

  // PATCH
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      if (id) category.id = name; // Corrected variable name
      if (name) category.name = name; // Corrected variable name

      await category.save();

      return res.send("Category modified successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while updating category" });
    }
  },

  // DELETE
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await category.destroy();

      return res.send("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      return res
        .status(500)
        .json({ message: "Internal server error while deleting category" });
    }
  },
};

module.exports = categoryController;
