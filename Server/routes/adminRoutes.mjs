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
adminRoute.post("/viewAttendance", markAttendance);

//delete attendance
adminRoute.delete("/viewAttendance", deleteAttendanceByUser);

//update attndance
adminRoute.patch("/viewAttendance", updateAttendanceByUser);

// //view
// adminRoute.post("/signin");

// //view
// adminRoute.post("/signin");

export default adminRoute;

// localhost:4000/api/v1/admin
