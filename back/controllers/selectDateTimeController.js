import asyncHandler from "express-async-handler";
import { selectDateTimeService } from "../services/selectDateTimeService.js";
import { HTTP_STATUSES } from "../utils/constants.js";

class SelectDateTimeController {
  add = asyncHandler(async (req, res) => {
    const { date, time, limits, period } = req.body;
    const info = await selectDateTimeService.add(date, time, limits, period);
    return res.status(HTTP_STATUSES.CREATED).json(info);
  });

  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { date, time, limits, period } = req.body;
    const message = await selectDateTimeService.update(
      id,
      date,
      time,
      limits,
      period
    );
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  getAll = asyncHandler(async (req, res) => {
    // const { limit, page } = req.query;
    const data = await selectDateTimeService.getAll();
    return res.status(HTTP_STATUSES.OK).json(data);
  });

  getById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await selectDateTimeService.getById(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  getByDate = asyncHandler(async (req, res) => {
    const { date } = req.query;
    const message = await selectDateTimeService.getByDate(date);
    return res.status(HTTP_STATUSES.OK).json(message);
  });

  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = await selectDateTimeService.delete(id);
    return res.status(HTTP_STATUSES.OK).json(message);
  });
}

export const selectDateTimeController = new SelectDateTimeController();
