const isAdmin = async (req, res, next) =>{ {
 { if(req.auth.roll = String(user))
      return res
        .status(403)
        .json({ message: "You must have admin permissions." });
    }{
  else
    next();
}
  }
};



