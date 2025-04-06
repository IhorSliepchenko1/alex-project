import asyncHandler from "express-async-handler";
import { statusesService } from "../services/statusesService.js";
import { HTTP_STATUSES } from "../utils/constants.js";

class StatusesController {
  add = asyncHandler(async (req, res) => {
    const { name, color } = req.body;
    const type = await statusesService.add(name, color);
    return res.status(HTTP_STATUSES.CREATED).json(type);
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, color } = req.body;
    const message = await statusesService.update(id, name, color);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await statusesService.getAll();
    return res.status(HTTP_STATUSES.OK).json(data);
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await statusesService.getById(id);
    return res.status(HTTP_STATUSES.OK).json(result);
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await statusesService.delete(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });
}

export const statusesController = new StatusesController();
