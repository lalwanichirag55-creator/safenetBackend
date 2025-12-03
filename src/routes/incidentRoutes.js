import express from "express";
import {
    createIncident,
    getUserIncidents,
    getAllIncidents,
    updateIncidentStatus,
    deleteIncident,
} from "../controllers/incidentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createIncident);
router.get("/", authMiddleware, getUserIncidents);
router.get("/all", authMiddleware, getAllIncidents); // Should add admin check here ideally
router.put("/:id", authMiddleware, updateIncidentStatus); // Should add admin check here ideally
router.delete("/:id", authMiddleware, deleteIncident); // Should add admin check here ideally

export default router;
