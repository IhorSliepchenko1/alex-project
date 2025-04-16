import { ApiError } from "../error/ApiError.js";
import { ServiceType } from "../models/models.js";

const formatString = (name) => {
  return name.slice(0, 1).toUpperCase() + name.slice(1).toLowerCase();
};

class ServiceTypeService {
  async add(name) {
    if (!name) {
      throw ApiError.badRequest("Please fill in all fields!");
    }

    const formatWord = formatString(name);

    const findStatus = await ServiceType.findOne({
      where: { name: formatWord },
    });

    if (findStatus) {
      throw ApiError.badRequest("ServiceType already exists!");
    }

    const serviceType = await ServiceType.create({ name: formatWord });
    return serviceType;
  }

  async update(id, name) {
    let formatWord = name ? formatString(name) : undefined;
    const findCurrentStatus = await ServiceType.findOne({ where: { id } });

    if (!findCurrentStatus) {
      throw ApiError.notFound("ServiceType not found!");
    }

    await ServiceType.update({ name: formatWord }, { where: { id } });

    return { message: "ServiceType updated successfully!" };
  }

  async getAll() {
    const data = await ServiceType.findAndCountAll({
      order: [["name", "ASC"]],
    });
    return data;
  }

  async getById(id) {
    const result = await ServiceType.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("Status not found!");
    }

    return result;
  }

  async delete(id) {
    const findServiceType = await ServiceType.findOne({ where: { id } });

    if (!findServiceType) {
      throw ApiError.notFound("ServiceType is not defined!");
    }
    await ServiceType.destroy({ where: { id } });
    return { message: "ServiceType deleted successfully!" };
  }
}

export const serviceTypeService = new ServiceTypeService();
