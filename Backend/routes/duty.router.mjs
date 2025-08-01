import express from "express";
import {
  addDuties,
  deleteDuty,
  deleteDutySheet,
  editDuty,
  markAttendance,
  updateSheet,
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
router.put("/:id", protectedRoute, updateSheet); //not tested

router.post("/addDuty/:id", protectedRoute, addDuties);
router.put("/editDuty/:sheetId/:dutyEntryId", protectedRoute, editDuty); //not tested
router.delete("/deleteDuty/:sheetId/:dutyEntryId", protectedRoute, deleteDuty); //not tested
router.post("/markAttendance/:sheetId/:dutyEntryId", protectedRoute, markAttendance); //partially tested

export default router;
