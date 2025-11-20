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
router.use(adminAccess); 

router.post("/companyReq", protectedRoute, getCompanyRequests); 
router.post("/companyReq/:id", protectedRoute, viewCompanyRequest); 
router.put("/favCompanyReq/:id", protectedRoute, markFavouriteCompanyReqFavourite); 
router.delete("/companyDel/:id", protectedRoute, deleteCompanyRequest);
router.post("/favCompanyReq", protectedRoute, favouriteCompanyRequests); 
router.post("/companyReq/:id", protectedRoute, acceptCompanyReq); 

router.post("/employeeReq", protectedRoute, getEmployeeRequests); 
router.post("/employeeReq/:id", protectedRoute, viewEmployeeRequest); 
router.put("/favEmployeeReq/:id", protectedRoute, markEmployeeteReqFavourite); 
router.delete("/employeeDel/:id", protectedRoute, deleteEmployeeRequest);
router.post("/favEmployeeReq", protectedRoute, favouriteEmployeeRequests); 
router.post("/employeeReq/:id", protectedRoute, acceptEmployeeReq); 

export default router;
