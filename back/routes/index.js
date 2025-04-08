import express from "express";
import userRoutes from "./userRoutes.js";
import statusesRoutes from "./statusesRoutes.js";
import messageRoutes from "./messageRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/status", statusesRoutes);
router.use("/message", messageRoutes);

export default router;
