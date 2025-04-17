import express from "express";
import { serviceTypeController } from "../controllers/serviceTypeController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = express.Router();
const { ADMIN } = ROLE;

router.post("/", serviceTypeController.add);
router.put("/:id", checkRoleMiddleware([ADMIN]), serviceTypeController.update);
router.get("/", serviceTypeController.getAll);
router.get("/:id", checkRoleMiddleware([ADMIN]), serviceTypeController.getById);
router.delete(
  "/:id",
  checkRoleMiddleware([ADMIN]),
  serviceTypeController.delete
);

export default router;
