import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";

export const adminAccess = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: `Unauthorized: No token provided` });

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) return res.status(401).json({ error: `Unauthorized: Invalid Token` }); //boaring check
    const user = await User.findById(decode.userId);

    if (user.role !== "admin") {
      return res.status(400).json({ error: `Unauthorized` });
    }

    next();
  } catch (error) {
    console.log(`error in adminAccess ${error.message}`);
    return res.status(500).json({ error: `error in AdminAccess` });
  }
};
