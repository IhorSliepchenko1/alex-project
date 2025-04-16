import asyncHandler from "express-async-handler";
import { consultationService } from "../services/consultationService.js";
import { HTTP_STATUSES } from "../utils/constants.js";

class ConsultationController {
  add = asyncHandler(async (req, res) => {
    const {
      full_name,
      email,
      phone,
      street,
      state,
      zip,
      descriptions,
      service_type,
      date,
      time,
    } = req.body;

    const uploaded = req.files.uploaded;

    const info = await consultationService.add(
      full_name,
      email,
      phone,
      street,
      state,
      zip,
      descriptions,
      service_type,
      date,
      time,
      uploaded
    );
    return res.status(HTTP_STATUSES.CREATED).json(info);
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const message = await consultationService.update(id, name);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  getAll = asyncHandler(async (req, res) => {
    const { limit, page } = req.query;
    const data = await consultationService.getAll(limit, page);
    return res.status(HTTP_STATUSES.OK).json(data);
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await consultationService.getById(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  // delete = asyncHandler(async (req, res) => {
  //   const { id } = req.params;
  //   const message = await statusesService.delete(id);
  //   return res.status(HTTP_STATUSES.OK).json(message);
  // });
}

export const consultationController = new ConsultationController();
