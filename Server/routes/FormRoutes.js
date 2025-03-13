import express from 'express'
const router = express.Router();

import { submitHireForm , getHireForms, imageController} from '../Controllers/FormController.js';
import { upload } from '../Middleware/uploadMiddleware.js';

router.post("/hire" , submitHireForm)

router.post("/uploads" , upload.single('file'),imageController)

router.post("/employeeform" , getHireForms)

export default router