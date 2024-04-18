const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authController = {
  getToken: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (user || user.password !== password)
        return res.json({ message: "Invalid credentials" });

      const token = jwt.sign({ sub: "user123" }, process.env.TOKEN_SECRET);

      return res.status("200").json({ token });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Internal server error while updating user" });
    }
  },
};

module.exports = authController;
