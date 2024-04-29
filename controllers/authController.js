const { User, Admin } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authController = {
    getToken: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Missing email or password" });
            }

            let role;
            let id;
            let userOrAdmin;

            const user = await User.findOne({ where: { email } });
            if (user) {
                role = "user";
                id = user.id;
                userOrAdmin = user;
            } else {
                const admin = await Admin.findOne({ where: { email } });
                if (admin) {
                    role = "admin";
                    id = admin.id;
                    userOrAdmin = admin;
                } else {
                    return res.status(404).json({ message: "User not found." });
                }
            }

            if (!(await bcrypt.compare(password, userOrAdmin.password))) {
                return res.status(401).json({ message: "Invalid credentials." });
            }

            const token = jwt.sign({ sub: id, role }, process.env.TOKEN_SECRET);

            return res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    signup: async (req, res) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: "Missing email or password" });
            }

            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }

            const newUser = await User.create({
                email,
                password: await bcrypt.hash(password, 10),
            });

            return res.status(201).json({ message: "User created successfully" });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },

    //Esto es para más adelante, no hay que prestarle atención, solo estuve investigando y me pareceio
    // forgotPassword: async (req, res) => {
    //     try {
    //         const { email } = req.body;
    //         if (!email) {
    //             return res.status(400).json({ message: "Missing email" });
    //         }

    //         const user = await User.findOne({ where: { email } });
    //         if (!user) {
    //             return res.status(404).json({ message: "User not found" });
    //         }

    //         return res.status(200).json({ message: "Password recovery email sent successfully" });
    //     } catch (err) {
    //         console.error(err);
    //         return res.status(500).json({ message: "Internal server error" });
    //     }
    // },
};



module.exports = authController;
