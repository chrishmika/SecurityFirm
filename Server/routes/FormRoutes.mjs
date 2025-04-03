import express from "express";
const router = express.Router();

import { submitHireForm, getHireForms, imageController } from "../controllers/FormController.js";
import { upload } from "../middleware/uploadMiddleware.mjs";

router.post("/hire", submitHireForm);
router.post("/uploads", upload.single("file"), imageController);
router.post("/employeeform", getHireForms);

export default router;

/**
 * @swagger
 * /api/v1/web/hire:
 *   post:
 *     summary: Submit a hire form
 *     description: Submitting a new hire form with employee details.
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
 *               phone:
 *                 type: string
 *                 example: "+1234567890"
 *               position:
 *                 type: string
 *                 example: "Software Engineer"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-05-01"
 *     responses:
 *       201:
 *         description: Successfully submitted the hire form
 *       400:
 *         description: Bad request, invalid data
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/web/uploads:
 *   post:
 *     summary: Upload a file (e.g., image)
 *     description: Upload a single file (e.g., resume, profile picture) with the hire form.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload (image or document)
 *     responses:
 *       200:
 *         description: Successfully uploaded the file
 *       400:
 *         description: Invalid file format
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/web/employeeform:
 *   post:
 *     summary: Get all hire forms submitted
 *     description: Retrieve all the hire forms submitted by users.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of hire forms
 *       404:
 *         description: No hire forms found
 *       500:
 *         description: Internal server error
 */
