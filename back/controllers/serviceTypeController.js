import asyncHandler from "express-async-handler";
import { serviceTypeService } from "../services/serviceTypeService.js";
import { HTTP_STATUSES } from "../utils/constants.js";

class ServiceTypeController {
  add = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const serviceType = await serviceTypeService.add(name);
    return res.status(HTTP_STATUSES.CREATED).json(serviceType);
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const message = await serviceTypeService.update(id, name);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  getAll = asyncHandler(async (req, res) => {
    const data = await serviceTypeService.getAll();
    return res.status(HTTP_STATUSES.OK).json(data);
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await serviceTypeService.getById(id);
    return res.status(HTTP_STATUSES.OK).json(result);
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await serviceTypeService.delete(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });
}

export const serviceTypeController = new ServiceTypeController();
