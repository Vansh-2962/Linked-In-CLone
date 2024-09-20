import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  deleteNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller.js";
const router = express.Router();

router.get("/", isAuthenticated, getUserNotifications);
router.put("/:id/read", isAuthenticated, markNotificationAsRead);
router.delete("/:id", isAuthenticated, deleteNotification);
export default router;
