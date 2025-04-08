import asyncHandler from "express-async-handler";
import { messageService } from "../services/messageService.js";
import { HTTP_STATUSES } from "../utils/constants.js";

class MessageController {
  add = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;
    const info = await messageService.add(name, email, phone, message);
    return res.status(HTTP_STATUSES.CREATED).json(info);
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const message = await messageService.update(id, name);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await messageService.getAll();
    return res.status(HTTP_STATUSES.OK).json(data);
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await messageService.getById(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  // delete = asyncHandler(async (req, res) => {
  //   const { id } = req.params;
  //   const message = await statusesService.delete(id);
  //   return res.status(HTTP_STATUSES.OK).json(message);
  // });
}

export const messageController = new MessageController();
