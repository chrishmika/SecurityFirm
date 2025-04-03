import express from "express";
import { addCompany, deleteCompany, updateCompany, getAllCompanies, getSingleCompany } from "../Controllers/companyController.mjs";

const companyRoute = express.Router();

companyRoute.post("/addCompany", addCompany);

companyRoute.get("/deleteCompany", deleteCompany);

companyRoute.get("/updateCompany", updateCompany);

companyRoute.get("/getAllCompany", getAllCompanies);

companyRoute.get("/getSingleCompany/:companyID", getSingleCompany);

export default companyRoute;
//localhost:4000/api/v1/company
