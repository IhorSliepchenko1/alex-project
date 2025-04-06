import { ApiError } from "../error/ApiError.js";
import { Statuses } from "../models/models.js";

const formatString = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
};

class StatusesService {
  async add(name, color) {
    if (!name || !color) {
      throw ApiError.badRequest("Заполните все данные!");
    }

    const formatWord = formatString(name);

    const findStatus = await Statuses.findOne({
      where: { name: formatWord },
    });

    if (findStatus) {
      throw ApiError.badRequest("Статус уже существует!");
    }

    const status = await Statuses.create({ name: formatWord, color });
    return status;
  }

  async update(id, name, color) {
    let formatWord = name ? formatString(name) : undefined;
    const findCurrentStatus = await Statuses.findOne({ where: { id } });

    if (color) {
      const findColor = await Statuses.findOne({ where: { color } });
      if (findColor) {
        throw ApiError.badRequest("Данный цвет уже занят!");
      }
    }

    if (!findCurrentStatus) {
      throw ApiError.notFound("Статус не найден!");
    }

    await Statuses.update(
      { name: formatWord, color: color ? color : undefined },
      { where: { id } }
    );

    return { message: "Статус успешно обновлен!" };
  }
  async getAll() {
    const data = await Statuses.findAndCountAll({
      order: [["name", "ASC"]],
    });
    return data;
  }
  async getById(id) {
    const result = await Statuses.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("Статус не найден!");
    }

    return result;
  }
  async delete(id) {
    const findStatus = await Statuses.findOne({ where: { id } });

    if (!findStatus) {
      throw ApiError.notFound("Статус не найден!");
    }
    await Statuses.destroy({ where: { id } });
    return { message: "Статус успешно удален!" };
  }
}

export const statusesService = new StatusesService();
