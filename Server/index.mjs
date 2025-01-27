import express from "express";
import dotenv from "dotenv";
import { log } from "node:console";

//configerations
dotenv.config();
const server = express();

//port asingment
const PORT = process.env.PORT || 4000;

server.get("/", (req, res) => {
  res.status(200).json({
    msg: "server is created",
  });
});

server.listen(PORT, () => log("server is running"));
