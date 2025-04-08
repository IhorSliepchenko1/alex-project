import { ApiError } from "../error/ApiError.js";
import { Message, Statuses } from "../models/models.js";

class MessageService {
  async add(name, email, phone, message) {
    if (!name || !email || !phone || !message) {
      throw ApiError.badRequest("Fill in all the details!");
    }

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    if (!emailValid.test(email)) {
      throw ApiError.badRequest("Email misspelling!");
    }

    await Message.create({ name, email, phone, message });
    return { message: "The message has been sent." };
  }

  async update(id, status_id) {
    const findMessage = await Message.findOne({ where: { id } });
    const findStatus = await Statuses.findOne({ where: { id: status_id } });

    if (!findMessage) {
      throw ApiError.badRequest("Message not found!");
    }

    if (!findStatus) {
      throw ApiError.badRequest("Status not found!");
    }

    await Message.update({ status_id }, { where: { id } });

    return { message: "Status has been successfully updated!" };
  }

  async getAll() {
    const data = await Message.findAndCountAll({
      order: [["name", "ASC"]],
    });
    return data;
  }

  async getById(id) {
    const result = await Message.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("Message not found!");
    }

    return result;
  }
  // async delete(id) {
  //   const findStatus = await Statuses.findOne({ where: { id } });

  //   if (!findStatus) {
  //     throw ApiError.notFound("Статус не найден!");
  //   }
  //   await Statuses.destroy({ where: { id } });
  //   return { message: "Статус успешно удален!" };
  // }
}

export const messageService = new MessageService();
