const { User } = require("../models");
const bcrypt = require("bcryptjs");

const userController = {
    index: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.json(users);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error while fetching users." });
        }
    },

    show: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            return res.json(user);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error while fetching user." });
        }
    },

    store: async (req, res) => {
        try {
            const { firstname, lastname, email, password } = req.body;
            if (firstname && lastname && email && password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.create({
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword,
                });
                return res.send("User created successfully!");
            } else {
                return res
                    .status(400)
                    .json({ message: "At least one value is empty." });
            }
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ message: "Internal server error while creating user." });
        }
    },

    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { firstname, lastname, email, password } = req.body;

            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            if (req.user.id !== user.id) {
                return res.status(403).json({ message: "Access denied: You can only update your own account." });
            }

            if (firstname) user.firstname = firstname;
            if (lastname) user.lastname = lastname;
            if (email) user.email = email;

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password = hashedPassword;
            }
            await user.save();

            return res.send("User modified successfully!");
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ message: "Internal server error while updating user." });
        }
    },

    destroy: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            if (req.user.id !== user.id) {
                return res.status(403).json({ message: "Access denied: You can only delete your own account." });
            }

            await user.destroy();

            return res.status(200).json({ message: "User deleted successfully." });
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ message: "Internal server error while deleting user." });
        }
    },
};

module.exports = userController;