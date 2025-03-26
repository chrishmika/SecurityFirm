import { Router } from "express";
import { markAttendance } from "../controllers/attendanceControllers.mjs";
import { signInUser, signOutUser, signupUser } from "../controllers/userControllers.mjs";

const userRoute = Router();

//signIn
userRoute.post("/signin", signInUser);

//signOut
userRoute.post("/signout", signOutUser);

//signup create account
userRoute.post("/signup", signupUser);

//markAttendance
userRoute.post("/attendanceSend", markAttendance); //done datavalidation is needed
//data need to send [employID, , employName,date, workStatus,workspace, locationX, locationY];

export default userRoute;

// localhost:4000/api/v1/user
