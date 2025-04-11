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

  async update(id, name) {
    const findMessage = await Message.findOne({ where: { id } });

    const findStatus = await Statuses.findOne({ where: { name } });

    if (!findMessage) {
      throw ApiError.badRequest("Message not found!");
    }

    if (!findStatus) {
      throw ApiError.badRequest("Status not found!");
    }

    await Message.update({ status_id: findStatus.id }, { where: { id } });

    return { message: "Status has been successfully updated!" };
  }

  async getAll(limit, page) {
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;

    const data = await Message.findAndCountAll({
      page,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: {
        model: Statuses,
        as: "status",
        attributes: ["name", "color"],
      },
      raw: true,
    });

    const modifiedRows = data.rows.map((message) => {
      if (!message.status_id) {
        message.status = "new message";
        message.color = "orange";
        delete message["status.name"];
        delete message["status.color"];
      } else {
        message.status = message["status.name"];
        message.color = message["status.color"];
        delete message["status.name"];
        delete message["status.color"];
      }

      return message;
    });

    return {
      count: data.count,
      rows: modifiedRows,
    };
  }

  async getById(id) {
    const result = await Message.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("Message not found!");
    }

    return result;
  }
}

export const messageService = new MessageService();
