import express from "express";
import { statusesController } from "../controllers/statusesController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = express.Router();

router.post("/", checkRoleMiddleware([ROLE.ADMIN]), statusesController.add);
router.put(
  "/:id",
  checkRoleMiddleware([ROLE.ADMIN]),
  statusesController.update
);
router.get(
  "/",
  checkRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
  statusesController.getAll
);
router.get(
  "/:id",
  checkRoleMiddleware([ROLE.ADMIN, ROLE.USER]),
  statusesController.getById
);
router.delete(
  "/:id",
  checkRoleMiddleware([ROLE.ADMIN]),
  statusesController.delete
);

export default router;
