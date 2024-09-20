import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import {
  acceptConnectionRequest,
  getConnectionRequests,
  getConnectionStatus,
  getUserConnections,
  rejectConnectionRequest,
  removeConnection,
  sendConnectionRequest,
} from "../controllers/connection.controller.js";

const router = express.Router();
router.post("/request/:userId", isAuthenticated, sendConnectionRequest);
router.put("/accept/:requestId", isAuthenticated, acceptConnectionRequest);
router.put("/reject/:requestId", isAuthenticated, rejectConnectionRequest);
router.get("/requests", isAuthenticated, getConnectionRequests);
router.get("/", isAuthenticated, getUserConnections);
router.delete("/:userId", isAuthenticated, removeConnection);
router.get("/status/:userId", isAuthenticated, getConnectionStatus);

export default router;
