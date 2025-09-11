import express from "express";
import {
  addDuties,
  deleteDuty,
  deleteDutySheet,
  editDuty,
  findDutyForEmployee,
  checkInDuty,
  checkOutDuty,
  getDutyStatus,
  markAttendance,
  updateSheet,
  viewAllDutySheets,
  viewDutySheet,
  viewSheetByDetails,
} from "../controllers/duty.controller.mjs";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { createDutySheet } from "../controllers/duty.controller.mjs";
const router = express.Router();

router.post("/newSheet", protectedRoute, createDutySheet);
router.post("/viewSheets", protectedRoute, viewAllDutySheets);
router.post("/viewSheetByDetails", protectedRoute, viewSheetByDetails);
router.post("/viewSheet/:id", protectedRoute, viewDutySheet);
router.delete("/:id", protectedRoute, deleteDutySheet);
router.put("/:id", protectedRoute, updateSheet); //not tested

router.post("/addDuty/:id", protectedRoute, addDuties);
router.put("/editDuty/:sheetId/:dutyEntryId", protectedRoute, editDuty); //not tested
router.delete("/deleteDuty/:sheetId/:dutyEntryId", protectedRoute, deleteDuty); //not tested
router.post("/markAttendance/:sheetId/:dutyEntryId", protectedRoute, markAttendance); //partially tested

// router.post("/find", protectedRoute, findDutyForEmployee); //partially tested

router.post("/checkin", protectedRoute, checkInDuty);

// Check-out endpoint
router.post("/checkout", protectedRoute, checkOutDuty);

// Get duty status endpoint
router.get("/:dutyId/status", protectedRoute, getDutyStatus);

// router.get("/today-duty", protectedRoute, getTodayDuty);

router.post("/fetchlocation", protectedRoute, findDutyForEmployee);
export default router;
