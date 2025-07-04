import express from "express";
import { companyRequest, allApplications, employeeRequest, uploadDocument, allCompanyApplications } from "../controllers/web.controller.mjs";
import { upload } from "../middleware/localStorage.mjs";

const router = express.Router();

router.post("/companyRequest", companyRequest);
router.post("/employeeRequest", employeeRequest);
router.post("/application", allApplications);
router.post("/CompanyApplications", allCompanyApplications);
router.post("/uploadDocument", upload.single("file"), uploadDocument); //not tested uploaded to local storage multer

export default router;

//create ,delete posts
//add company logos to site
// add images to galary
//update company profile pdf
