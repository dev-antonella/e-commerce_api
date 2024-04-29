async function isUser(req, res, next) {
    try {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
        const userRole = req.auth.role;
        if (userRole) {
            if (userRole === "user") {
                next();
            } else {
                return res.status(403).json({
                    message: "User role required.",
=======
>>>>>>> Stashed changes
        const Role = req.auth.role;
        if (Role) {
            if (Role !== "user" && Role !== "admin") {
                return res.status(403).json({
                    message: "You must have user permissions.",
<<<<<<< Updated upstream
=======
>>>>>>> 710197bbbf0bc9b69b02a59206408bba563cf42a
>>>>>>> Stashed changes
                });
            } else {
                next();
            }
        } else {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
            return res.status(498).json({ message: "Empty or incorrect token." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error." });
    }
}
module.exports = isUser;

=======
>>>>>>> Stashed changes
            return res.status(498).json({ message: "Empty or wrong token" });
        }
    } catch (error) {
        console.error("Error in isUser middleware:", error);
        return res.status(500).json({ message: "Error interno del servidor." });
    }
}
<<<<<<< Updated upstream
module.exports = isUser;
=======
module.exports = isUser;
>>>>>>> 710197bbbf0bc9b69b02a59206408bba563cf42a
>>>>>>> Stashed changes
