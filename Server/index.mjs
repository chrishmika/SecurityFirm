import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import adminRoute from "./routes/adminRoutes.mjs";
import userRoute from "./routes/userRoutes.mjs";

//express app
const app = express();

//middleware
configDotenv();
app.use(express.json());
app.use(cors());

app.use("/api/v1/admin", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, (err) => {
      !err ? console.log(`data base connected and listen to server on ${process.env.PORT}`) : console.log(err);
    });
  })
  .catch((err) => {
    app.listen(process.env.PORT, (err) => {
      !err ? console.log(`data base not onnected and listen to server on ${process.env.PORT}`) : console.log(err);
    });
  });
