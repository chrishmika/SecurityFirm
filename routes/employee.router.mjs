import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import {
  deleteEmployee,
  getEmployeeList,
  updateEmoloyee,
  viewEmployee,
  viewEmployees,
} from "../controllers/employee.controller.mjs";
import { adminAccess } from "../middleware/adminAccess.mjs";

const router = express.Router();

//only admin can access
router.use(adminAccess);

router.post("/", protectedRoute, viewEmployees);
router.post("/:id", protectedRoute, viewEmployee);
router.delete("/:id", protectedRoute, deleteEmployee);
router.put("/:id", protectedRoute, updateEmoloyee);
router.get("/employeeList", getEmployeeList);

export default router;
