import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";

import adminRoute from "./routes/adminRoutes.mjs";
import userRoute from "./routes/userRoutes.mjs";
import HireFormRoutes from "./routes/FormRoutes.js";
import companyRoute from "./routes/companyRoutes.mjs";

//express app
const app = express();

//middleware
configDotenv();
app.use(express.json());
app.use(cors(
  {origin: "*"}
));
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("/uploads"));

app.use("/api/v1/admin", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//base path router module
app.use("/api/v1/web", HireFormRoutes);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);
app.use('/api/v1/company',companyRoute);

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
