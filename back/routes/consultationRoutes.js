import express from "express";
import { consultationController } from "../controllers/consultationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = express.Router();
const { ADMIN, USER } = ROLE;

router.post("/", consultationController.add);
router.get(
  "/:id",
  checkRoleMiddleware([ADMIN]),
  consultationController.getById
);
router.get(
  "/",
  checkRoleMiddleware([ADMIN, USER]),
  consultationController.getAll
);
router.put("/:id", checkRoleMiddleware([ADMIN]), consultationController.update);

export default router;
