import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklist.model.js";

export const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      res.status(400).json({
        message: "Invalid token. Please login!",
      });
    }

    const isTokenBlacklisted = await BlacklistToken.findOne({ token });

    if (isTokenBlacklisted) {
      res.status(400).json({
        message: "Invalid token. Please login!",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({ message: "Invalid token" });
  }
};
