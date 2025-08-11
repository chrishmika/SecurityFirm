import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import {
  deleteCompany,
  getCompanyList,
  updateCompany,
  viewCompanies,
  viewCompany,
} from "../controllers/company.controller.mjs";
import { adminAccess } from "../middleware/adminAccess.mjs";
const router = express.Router();

//only admin can access
router.use(adminAccess);

router.post("/", protectedRoute, viewCompanies);
router.post("/:id", protectedRoute, viewCompany);
router.delete("/:id", protectedRoute, deleteCompany);
router.put("/:id", protectedRoute, updateCompany);
router.get("/getCompanyList", getCompanyList);

export default router;
