import express from "express";
import {
  addDuties,
  deleteDuty,
  deleteDutySheet,
  editDuty,
  markAttendance,
  viewAllDutySheets,
  viewDutySheet,
} from "../controllers/duty.controller.mjs";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { createDutySheet } from "../controllers/duty.controller.mjs";
const router = express.Router();

router.post("/newSheet", protectedRoute, createDutySheet);
router.post("/viewSheets", protectedRoute, viewAllDutySheets);
router.post("/viewSheet/:id", protectedRoute, viewDutySheet);
router.delete("/:id", protectedRoute, deleteDutySheet);
router.post("/addDuty/:id", protectedRoute, addDuties);
router.put("/editDuty/:id", protectedRoute, editDuty); //not tested
router.delete("/deleteDuty/:id", protectedRoute, deleteDuty); //not tested
router.post("/markAttendance/:id", protectedRoute, markAttendance); //not tested

export default router;
