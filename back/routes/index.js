import express from "express";
import userRoutes from "./userRoutes.js";
import statusesRoutes from "./statusesRoutes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/status", statusesRoutes);

export default router;
