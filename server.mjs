import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import fs from "fs";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

import connectMongoDB from "./db/connectMondoDB.mjs";

import authRouter from "./routes/auth.router.mjs";
import adminRouter from "./routes/admin.router.mjs";
import employeeRouter from "./routes/employee.router.mjs";
import dutyRouter from "./routes/duty.router.mjs";
import companyRouter from "./routes/company.router.mjs";
import notificationRouter from "./routes/notification.router.mjs";
import webRouter from "./routes/web.router.mjs";
import reqRouter from "./routes/request.router.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// API Routers
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/duty", dutyRouter);
app.use("/api/company", companyRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/web", webRouter);
app.use("/api/req", reqRouter);

// ---------------------------
// DEPLOYMENT FRONTEND SETUP
// ---------------------------

const isProd = process.env.NODE_ENV === "production";

if (isProd) {
  const adminDist = join(__dirname, "Frontend/Admin/dist");
  const webDist = join(__dirname, "Frontend/Website/dist");

  if (fs.existsSync(adminDist)) {
    app.use("/app", express.static(adminDist));
    app.get("/app/*", (req, res) => {
      res.sendFile(join(adminDist, "index.html"));
    });
  }

  if (fs.existsSync(webDist)) {
    app.use("/", express.static(webDist));
    app.get("/*", (req, res) => {
      res.sendFile(join(webDist, "index.html"));
    });
  }
}

// ---------------------------
// Start Server
// ---------------------------

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
connectMongoDB();
