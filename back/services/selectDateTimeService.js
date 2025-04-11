import { ApiError } from "../error/ApiError.js";
import { SelectDateTime, Consultation } from "../models/models.js";

class SelectDateTimeService {
  async add(date, time, limits) {
    if (!date || !time || !limits) {
      throw ApiError.badRequest("Please fill in all fields!");
    }

    const find = await SelectDateTime.findOne({
      where: { date, time },
    });

    if (find) {
      throw ApiError.badRequest("SelectDateTime already exists!");
    }

    const selectDateTime = await SelectDateTime.create({ date, time, limits });
    return selectDateTime;
  }

  async update(id, date, time, limits) {
    const find = await SelectDateTime.findOne({
      where: { date, time },
    });

    if (!find) {
      throw ApiError.badRequest("SelectDateTime not found!");
    }

    await SelectDateTime.update(
      {
        date: date ? date : undefined,
        time: time ? time : undefined,
        limits: limits ? limits : undefined,
      },
      { where: { id } }
    );

    return { message: "SelectDateTime updated successfully!" };
  }

  async getAll() {
    const data = await SelectDateTime.findAndCountAll({
      order: [["createdAt", "DESC"]],
    });
    return data;
  }

  async getById(id) {
    const result = await SelectDateTime.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("SelectDateTime not found!");
    }

    return result;
  }

  async delete(id) {
    const findSelectDateTime = await SelectDateTime.findOne({ where: { id } });

    if (!findSelectDateTime) {
      throw ApiError.notFound("findSelectDateTime not found!");
    }

    const checkConsultation = await Consultation.findOne({
      where: { slect_date_time_id: id },
    });

    if (checkConsultation) {
      throw ApiError.notFound(
        "Deletion is not possible, there is a сonsultation for this date!"
      );
    }

    await SelectDateTime.destroy({ where: { id } });
    return { message: "SelectDateTime deleted successfully!" };
  }
}

export const selectDateTimeService = new SelectDateTimeService();
