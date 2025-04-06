import asyncHandler from "express-async-handler";
import { userService } from "../services/userService.js";
import { HTTP_STATUSES } from "../utils/constants.js";

class UserController {
  add = asyncHandler(async (req, res) => {
    const { login, password, role } = req.body;
    const message = await userService.add(login, password, role);
    res.status(HTTP_STATUSES.CREATED).json(message);
  });

  login = asyncHandler(async (req, res) => {
    const { login, password } = req.body;
    const token = await userService.login(login, password);
    res.status(HTTP_STATUSES.OK).json({ token });
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await userService.getAll();
    return res.status(HTTP_STATUSES.OK).json(data);
  });

  updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { login, newPassword, oldPassword, role } = req.body;

    const args = [id, login, newPassword, oldPassword, role];
    const user = await userService.updateUser(...args);

    return res.status(HTTP_STATUSES.OK).json(user);
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const messageDelete = await userService.delete(id);
    return res.status(HTTP_STATUSES.OK).json(messageDelete);
  });

  check = asyncHandler(async (req, res) => {
    const user = req.user;
    const token = await userService.check(user);
    return res.status(HTTP_STATUSES.OK).json({ token });
  });
}

export const userController = new UserController();
