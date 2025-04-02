import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import cors from "cors";
//api documentation
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { dirname } from "path";
import { fileURLToPath } from "url";

import adminRoute from "./routes/adminRoutes.mjs";
import userRoute from "./routes/userRoutes.mjs";
import HireFormRoutes from "./routes/FormRoutes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
//express app
const app = express();

//middleware
configDotenv();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("/uploads"));

//api swagger configerations
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express Api",
      version: "1.0.0",
      description: "Security Management System",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: [`./routes/*.mjs`],
};

app.use("/api/v1/admin", (req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//base path router module
app.use("/api/v1/web", HireFormRoutes);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/user", userRoute);

//generate docs
const Doc = swaggerJsDoc(swaggerOptions);
app.use("/apiDoc", swaggerUi.serve, swaggerUi.setup(Doc));

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

// http://localhost:4000/apiDoc/
