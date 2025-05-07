import { Router } from "express";
import { markAttendance } from "../controllers/attendanceControllers.mjs";
import { signInUser, signOutUser, signupUser } from "../controllers/userControllers.mjs";
import requireAuth from "../middleware/requireAuth.mjs";

const userRoute = Router();

// userRoute.use(requireAuth)

userRoute.post("/signin", signInUser);

userRoute.post("/signout", signOutUser);

userRoute.post("/signup", signupUser); // create new account

userRoute.post("/attendanceSend", markAttendance); //done datavalidation is needed
//data need to send [employID, , employName,date, workStatus,workspace, locationX, locationY];

export default userRoute;

// localhost:4000/api/v1/user

/**
 * @swagger
 * /api/v1/user/signin:
 *   post:
 *     summary: User SignIn
 *     description: Endpoint for users to log in by providing their credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully signed in
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/signout:
 *   post:
 *     summary: User SignOut
 *     description: Endpoint for users to log out from the application.
 *     responses:
 *       200:
 *         description: Successfully signed out
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: User SignUp
 *     description: Endpoint to create a new user account with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *     responses:
 *       201:
 *         description: Successfully created a new account
 *       400:
 *         description: Invalid input data (e.g., missing required fields)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/attendanceSend:
 *   post:
 *     summary: Mark Attendance
 *     description: Endpoint to submit attendance information for a user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               employeeID:
 *                 type: string
 *                 example: "EMP123"
 *               employeeName:
 *                 type: string
 *                 example: "John Doe"
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-01"
 *               workStatus:
 *                 type: string
 *                 example: "Present"
 *               workspace:
 *                 type: string
 *                 example: "Office A"
 *               locationX:
 *                 type: number
 *                 example: 40.7128
 *               locationY:
 *                 type: number
 *                 example: -74.0060
 *     responses:
 *       200:
 *         description: Successfully marked attendance
 *       400:
 *         description: Invalid data provided
 *       500:
 *         description: Internal server error
 */
