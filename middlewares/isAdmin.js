async function isAdmin(req, res, next) {
    try {
        const userRole = req.auth.role;
        if (userRole) {
            if (userRole !== "admin") {
                return res.status(403).json({
                    message: "You must have administrator permissions.",
                });
            } else {
                next();
            }
        } else {
            return res.status(498).json({ message: "Empty or incorrect token." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}
module.exports = isAdmin;
