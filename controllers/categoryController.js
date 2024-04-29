const { Category } = require("../models");

const categoryController = {
  index: async (req, res) => {
    try {
      const category = await Category.findAll();
      return res.json(category);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while fetching category." });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }

      return res.json(category);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while fetching category." });
    }
  },

  store: async (req, res) => {
    try {
      const { name } = req.body;
      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: only administrators can create categories." });
    }
      await Category.create({ name });
      return res.send("Category created successfully!");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while creating category." });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }

      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: only administrators can modify categories." });
    }

      if (id) category.id = name;
      if (name) category.name = name;

      await category.save();

      return res.send("Category modified successfully!");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while updating category." });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);

      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }

      if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied: only administrators can delete categories." });
    }

      await category.destroy();

      return res.send("Category deleted successfully!");
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error while deleting category." });
    }
  },
};

module.exports = categoryController;
