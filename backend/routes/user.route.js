import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  getPublicProfile,
  getSuggestedConnections,
  updateProfile,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/suggestions", isAuthenticated, getSuggestedConnections);
router.get("/:username", isAuthenticated, getPublicProfile);
router.put("/profile", isAuthenticated, updateProfile);

export default router;
