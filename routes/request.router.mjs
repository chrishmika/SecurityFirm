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
  rejectCompanyReq,
  rejectEmployeeReq,
} from "../controllers/request.controller.mjs";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { adminAccess } from "../middleware/adminAccess.mjs";

const router = express.Router();

//only admins can access here
router.use(adminAccess); //works

router.post("/companyReq", protectedRoute, getCompanyRequests);
router.post("/companyReq/:id", protectedRoute, viewCompanyRequest);
router.put("/favCompanyReq/:id", protectedRoute, markFavouriteCompanyReqFavourite);
router.delete("/companyDel/:id", protectedRoute, deleteCompanyRequest);
router.post("/favCompanyReq", protectedRoute, favouriteCompanyRequests);
router.post("/employeeReq", protectedRoute, getEmployeeRequests);
router.post("/employeeReq/:id", protectedRoute, viewEmployeeRequest);
router.put("/favEmployeeReq/:id", protectedRoute, markEmployeeteReqFavourite);
router.delete("/employeeDel/:id", protectedRoute, deleteEmployeeRequest);
router.post("/favEmployeeReq", protectedRoute, favouriteEmployeeRequests);
router.put("/acceptCompanyReq/:id", protectedRoute, acceptCompanyReq);
router.put("/acceptEmployeeReq/:id", protectedRoute, acceptEmployeeReq);
router.put("/rejectCompanyReq/:id", protectedRoute, rejectCompanyReq);
router.put("/rejectEmployeeReq/:id", protectedRoute, rejectEmployeeReq);
export default router;
