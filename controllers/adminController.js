const { Admin } = require("../models");
const bcrypt = require("bcryptjs");

const adminController = {
    index: async (req, res) => {
        try {
            const admins = await Admin.findAll();
            return res.json(admins);
        } catch (error) {
            console.error("Error fetching admins:", error);
            return res.status(500).json({
                message: "Internal server error while fetching admins",
            });
        }
    },
    show: async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await Admin.findByPk(id);

            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            return res.json(admin);
        } catch (error) {
            console.error("Error fetching admin:", error);
            return res.status(500).json({
                message: "Internal server error while fetching admin",
            });
        }
    },
    store: async (req, res) => {
        try {
            const { firstname, lastname, email, password } = req.body;
            if (password && firstname && lastname && email) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await Admin.create({
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword,
                });
                return res.send("Admin created successfully!");
            } else {
                return res
                    .status(400)
                    .json({ message: "Atleast one value is empty" });
            }
        } catch (error) {
            console.error("Error creating admin:", error);
            return res.status(500).json({
                message: "Internal server error while creating admin",
            });
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { firstname, lastname, email, password } = req.body;

            const admin = await Admin.findByPk(id);

            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            if (firstname) admin.firstname = firstname;
            if (lastname) admin.lastname = lastname;
            if (email) admin.email = email;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                admin.password = hashedPassword;
            }

            await admin.save();

            return res.send("Admin modified successfully!");
        } catch (error) {
            console.error("Error updating admin:", error);
            return res.status(500).json({
                message: "Internal server error while updating admin",
            });
        }
    },
    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const admin = await Admin.findByPk(id);

            if (id === 1) {
                return res.status(403).json({
                    message: "The root administrator cannot be deleted",
                });
            }
            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }

            await admin.destroy();

            return res
                .status(200)
                .json({ message: "Admin deleted successfully" });
        } catch (error) {
            console.error("Error deleting admin:", error);
            return res.status(500).json({
                message: "Internal server error while deleting admin",
            });
        }
    },
};

module.exports = adminController;
