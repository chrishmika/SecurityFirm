import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  
  // Set cookie for web clients
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", // prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
  
  // Return token for React Native clients
  return token;
};