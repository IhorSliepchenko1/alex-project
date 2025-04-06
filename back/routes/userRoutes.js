import express from "express";
import { userController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = express.Router();
const { ADMIN, USER } = ROLE;

router.post("/registration", userController.add);
router.post("/login", userController.login);
router.get("/check", authMiddleware, userController.check);
router.get("/", checkRoleMiddleware([ADMIN, USER]), userController.getAll);
router.put("/:id", checkRoleMiddleware([ADMIN]), userController.updateUser);
router.delete("/:id", checkRoleMiddleware([ADMIN]), userController.delete);

export default router;
