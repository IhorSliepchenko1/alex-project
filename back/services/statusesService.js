import { ApiError } from "../error/ApiError.js";
import { Statuses } from "../models/models.js";

const formatString = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
};

class StatusesService {
  async add(name, color) {
    if (!name || !color) {
      throw ApiError.badRequest("Please fill in all fields!");
    }

    const formatWord = formatString(name);
    if (formatString === "New message") {
      throw ApiError.badRequest("new message - base name for new data!");
    }

    const findStatus = await Statuses.findOne({
      where: { name: formatWord },
    });

    if (findStatus) {
      throw ApiError.badRequest("Status already exists!");
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
        throw ApiError.badRequest("This color is already in use!");
      }
    }

    if (!findCurrentStatus) {
      throw ApiError.notFound("Status not found!");
    }

    await Statuses.update(
      { name: formatWord, color: color ? color : undefined },
      { where: { id } }
    );

    return { message: "Status updated successfully!" };
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
      throw ApiError.notFound("Status not found!");
    }

    return result;
  }

  async delete(id) {
    const findStatus = await Statuses.findOne({ where: { id } });

    if (!findStatus) {
      throw ApiError.notFound("Status not found!");
    }
    await Statuses.destroy({ where: { id } });
    return { message: "Status deleted successfully!" };
  }
}

export const statusesService = new StatusesService();
