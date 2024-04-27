require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Admin } = require("../models");
const bcrypt = require("bcryptjs");

const authController = {
    getToken: async (req, res) => {
        try {
            const { email, password } = req.body;
            let role;
            let id;
            if (email && password) {
                const user = await User.findOne({ where: { email } });
                if (user) {
                    role = "user";
                    id = user.id;
                    if (!(await bcrypt.compare(password, user.password))) {
                        return res.json({ message: "Invalid credentials" });
                    }
                } else {
                    const admin = await Admin.findOne({ where: { email } });                  
                    if (admin) {
                        role = "admin";
                        id = admin.id;
                        if (!(await bcrypt.compare(password, admin.password))) {
                            return res.json({ message: "Invalid credentials" });
                        }
                    }else{
                        return res.json({ message: "No user found" });
                    }
                }
            }else{
                return res.json({ message: "No body found" });
            }
            const token = jwt.sign({ sub: id, role }, process.env.TOKEN_SECRET);

            return res.status(200).json({ token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    },
};

module.exports = authController;
