import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

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
    // origin: ["http://localhost:8081", "https://swxlqlfk-2000.asse.devtunnels.ms"],
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" })); //this can cause DOS atatacks bit needed to upload pdfs
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use("/uploadDocument", express.static("/uploads")); //need to understand and not tested
app.use(fileUpload());

//base path router module
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/duty", dutyRouter); //testing...
app.use("/api/company", companyRouter);
app.use("/api/notification", notificationRouter);
app.use("/api/web", webRouter);
app.use("/api/req", reqRouter); //not tested //from web site

//deployment
app.use("/app", express.static(join(__dirname, "Frontend/Admin/dist")));
app.use(express.static(join(__dirname, "Frontend/Website/dist")));

// Paths to your built frontends
const adminBuildPath = join(__dirname, "Frontend/Admin/dist"); // or "build" if React/Vue
const websiteBuildPath = join(__dirname, "Frontend/Website/dist"); // or "build"

if (process.env.NODE_ENV === "production") {
  app.get("/app/*", (req, res) => {
    const adminIndex = join(adminBuildPath, "index.html");
    if (fs.existsSync(adminIndex)) {
      res.sendFile(adminIndex);
    } else {
      res.status(500).send("Admin SPA not built yet");
    }
  });

  // Website SPA catch-all
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api") && !req.path.startsWith("/app")) {
      const websiteIndex = join(websiteBuildPath, "index.html");
      if (fs.existsSync(websiteIndex)) {
        res.sendFile(websiteIndex);
      } else {
        res.status(500).send("Website SPA not built yet");
      }
    }
  });
}

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
connectMongoDB();
