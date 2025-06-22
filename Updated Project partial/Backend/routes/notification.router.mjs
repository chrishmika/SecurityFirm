import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { deleteNotification, FavouriteNotifications, getNotifications, markFavourite, viewNotification } from "../controllers/notifiaction.controller.mjs";
import { adminAccess } from "../middleware/adminAccess.mjs";

const router = express.Router();

///only admins can access
router.use(adminAccess);

router.get("/", protectedRoute, getNotifications);
router.get("/favouriteNotifications", protectedRoute, FavouriteNotifications);
router.get("/:id", protectedRoute, viewNotification);
router.put("/:id", protectedRoute, markFavourite);
router.delete("/:id", protectedRoute, deleteNotification);

export default router;
