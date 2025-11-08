import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { changePassword, forgetPassword, getme, login, logout, signup } from "../controllers/auth.controller.mjs";
import { adminAccess } from "../middleware/adminAccess.mjs";

const router = express.Router();

router.get("/profile", protectedRoute, getme);
router.get("/me", protectedRoute, getme);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/changePassword", protectedRoute, changePassword);
router.post("/forgetPassword", protectedRoute, adminAccess, forgetPassword);

export default router;
