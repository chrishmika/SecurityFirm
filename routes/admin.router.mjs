import express from "express";
import { createCompany, createEmployee, getStatistics } from "../controllers/admin.controller.mjs";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { adminAccess } from "../middleware/adminAccess.mjs";

const router = express.Router();

//only admin can access
router.use(adminAccess);

router.post("/createEmployee", protectedRoute, createEmployee);
router.post("/createCompany", protectedRoute, createCompany);
router.post("/viewStats", protectedRoute, getStatistics);

export default router;
