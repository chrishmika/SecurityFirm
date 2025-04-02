import { Router } from "express";
import { deleteAttendanceByUser, markAttendance, showAllAttendanceByDateRange, updateAttendanceByUser } from "../controllers/attendanceControllers.mjs";

const adminRoute = Router();

//signIn
//added to userControls.mjs
// adminRoute.post("/signin");

//view attendance
adminRoute.get("/viewAttendance", showAllAttendanceByDateRange);
//view  specific attendance
adminRoute.get("/viewAttendance/");
//create attendance
adminRoute.post("/markAttendance", markAttendance);
//delete attendance
adminRoute.delete("/viewAttendance", deleteAttendanceByUser);
//update attndance
adminRoute.patch("/viewAttendance", updateAttendanceByUser);

export default adminRoute;

// localhost:4000/api/v1/admin

/**
 * @swagger
 * /api/v1/admin/viewAttendance:
 *   get:
 *     summary: Get all attendance records
 *     description: Retrieve attendance records within a date range.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: endDate
 *         required: false
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved attendance records
 *       204:
 *         description: No content found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/viewAttendance/{attendanceId}:
 *   get:
 *     summary: View specific attendance record
 *     description: Retrieve a specific attendance record by its ID.
 *     parameters:
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the attendance record to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the attendance record
 *       404:
 *         description: Attendance record not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/markAttendance:
 *   post:
 *     summary: Mark attendance for a user
 *     description: Create a new attendance record for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employID:
 *                 type: string
 *                 example: "12345"
 *               employName:
 *                 type: string
 *                 example: "John Doe"
 *               Date:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-01"
 *               workStatus:
 *                 type: string
 *                 enum: [Present, Absent, Late]
 *                 example: "Present"
 *               workplace:
 *                 type: string
 *                 example: "HQ Office"
 *               locationX:
 *                 type: number
 *                 example: 12.3456
 *               locationY:
 *                 type: number
 *                 example: 98.7654
 *     responses:
 *       201:
 *         description: Successfully marked attendance
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/viewAttendance:
 *   delete:
 *     summary: Delete an attendance record
 *     description: Remove an attendance record by user ID.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose attendance is to be deleted.
 *     responses:
 *       200:
 *         description: Attendance deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admin/viewAttendance:
 *   patch:
 *     summary: Update attendance record
 *     description: Modify an existing attendance record for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "12345"
 *               status:
 *                 type: string
 *                 enum: [Present, Absent, Late]
 *                 example: "Late"
 *     responses:
 *       200:
 *         description: Attendance updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
