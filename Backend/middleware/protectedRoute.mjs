import jwt from "jsonwebtoken";
import User from "../models/user.model.mjs";

export const protectedRoute = async (req, res, next) => {
  try {
    // console.log("hi");
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: `Unauthorized: No token provided` });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Used protected route : ", decoded);

    if (!decoded) return res.status(401).json({ error: `Unauthorized: Invalid Token` });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ error: "user not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(`error on protected route middleware ${error.message}`);
    return res.status(500).json({ error: `internal server error` });
  }
};
