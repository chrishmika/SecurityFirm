import express from "express";
import { deleteDutySheet, viewAllDutySheets, viewDutySheet } from "../controllers/duty.controller.mjs";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
const router = express.Router();

router.post("/viewDutySheets", protectedRoute, viewAllDutySheets); //not tested
router.post("/viewDutySheet/:id", protectedRoute, viewDutySheet); //not tested
router.delete("/:id", protectedRoute, deleteDutySheet); //not tested

export default router;
