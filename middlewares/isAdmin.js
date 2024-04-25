async function isAdmin(req, res, next) {
  try {
    const userRole = req.auth.role;

    if (userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "You must have administrator permissions." });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in isAdmin middleware:", error);
    return res.status(500).json({ message: "Error interno del servidor." });
  }
}
module.exports = isAdmin;
