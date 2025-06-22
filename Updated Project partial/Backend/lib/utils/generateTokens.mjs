import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, //15 days in ms
    // maxAge: 10 * 60 * 1000, //10 min in ms
    httpOnly: true, //prevent cross site scripting
    sameSite: "strict", //csrf prevent
    secure: process.env.NODE_ENV !== "development", //true on production
  });
};
