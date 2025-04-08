import express from "express";
import { messageController } from "../controllers/messageController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = express.Router();

router.post("/", messageController.add);
router.put("/:id", checkRoleMiddleware([ROLE.ADMIN]), messageController.update);
router.get("/", checkRoleMiddleware([ROLE.ADMIN]), messageController.getAll);
router.get(
  "/:id",
  checkRoleMiddleware([ROLE.ADMIN]),
  messageController.getById
);
// router.delete(
//   "/:id",
//   checkRoleMiddleware([ROLE.ADMIN]),
//   statusesController.delete
// );

export default router;
