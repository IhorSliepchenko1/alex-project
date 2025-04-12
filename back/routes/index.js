import express from "express";
import userRoutes from "./userRoutes.js";
import statusesRoutes from "./statusesRoutes.js";
import messageRoutes from "./messageRoutes.js";
import serviceTypeRoutes from "./serviceTypeRoutes.js";
import selectDateTimeRoutes from "./selectDateTimeRoutes.js";
import consultationRoutes from "./consultationRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/status", statusesRoutes);
router.use("/message", messageRoutes);
router.use("/service-type", serviceTypeRoutes);
router.use("/select-date-time", selectDateTimeRoutes);
router.use("/consultation", consultationRoutes);

export default router;
