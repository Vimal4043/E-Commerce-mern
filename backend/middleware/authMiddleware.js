import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("_id isAdmin");
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    req.user = {
      id: user._id,
      isAdmin: user.isAdmin,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Admin access denied" });
};