import express from "express";
import {
  acceptCompanyReq,
  acceptEmployeeReq,
  deleteCompanyRequest,
  deleteEmployeeRequest,
  favouriteCompanyRequests,
  favouriteEmployeeRequests,
  getCompanyRequests,
  getEmployeeRequests,
  markEmployeeteReqFavourite,
  markFavouriteCompanyReqFavourite,
  viewCompanyRequest,
  viewEmployeeRequest,
} from "../controllers/request.controller.mjs";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { adminAccess } from "../middleware/adminAccess.mjs";

const router = express.Router();

//only admins can access here
router.use(adminAccess); //works

router.post("/companyReq", protectedRoute, getCompanyRequests); //not tested
router.post("/companyReq/:id", protectedRoute, viewCompanyRequest); //not tested
router.put("/favCompanyReq/:id", protectedRoute, markFavouriteCompanyReqFavourite); //not tested
router.delete("/companyReq/:id", protectedRoute, deleteCompanyRequest); //not tested
router.post("/favCompanyReq", protectedRoute, favouriteCompanyRequests); //not tested
router.post("/companyReq/:id", protectedRoute, acceptCompanyReq); //not tested

router.post("/employeeReq", protectedRoute, getEmployeeRequests); //not tested
router.post("/employeeReq/:id", protectedRoute, viewEmployeeRequest); //not tested
router.put("/favEmployeeReq/:id", protectedRoute, markEmployeeteReqFavourite); //not tested
router.delete("/employeeReq/:id", protectedRoute, deleteEmployeeRequest); //not tested
router.post("/favEmployeeReq", protectedRoute, favouriteEmployeeRequests); //not tested
router.post("/employeeReq/:id", protectedRoute, acceptEmployeeReq); //not tested

export default router;
