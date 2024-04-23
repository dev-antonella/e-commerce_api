const isAdmin = async (req, res, next) => {
  try {
    const userRole = req.auth.roll;

    if (userRole === "admin") {
      return res
        .status(403)
        .json({ message: "You must have administrator permissions." });
    } else {
      next();
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
