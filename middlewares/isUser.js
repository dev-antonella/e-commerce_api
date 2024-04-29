async function isUser(req, res, next) {
    try {
        const Role = req.auth.role;
        if (Role) {
            if (Role !== "user" && Role !== "admin") {
                return res.status(403).json({
                    message: "You must have user permissions.",
                });
            } else {
                next();
            }
        } else {
            return res.status(498).json({ message: "Empty or wrong token" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}
module.exports = isUser;
