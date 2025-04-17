import express from "express";
import { selectDateTimeController } from "../controllers/selectDateTimeController.js";
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
import { ROLE } from "../utils/constants.js";

const router = express.Router();
const { ADMIN } = ROLE;

router.post("/", selectDateTimeController.add);
router.put(
  "/:id",
  checkRoleMiddleware([ADMIN]),
  selectDateTimeController.update
);
router.get(
  "/all",
  checkRoleMiddleware([ADMIN]),
  selectDateTimeController.getAll
);
// router.get(
//   "/:id",
//   checkRoleMiddleware([ADMIN]),
//   selectDateTimeController.getById
// );
router.get("/", selectDateTimeController.getByDate);
router.delete(
  "/:id",
  checkRoleMiddleware([ADMIN]),
  selectDateTimeController.delete
);

export default router;
