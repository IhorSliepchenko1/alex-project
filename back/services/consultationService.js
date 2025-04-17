import { ApiError } from "../error/ApiError.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  SelectDateTime,
  ServiceType,
  Consultation,
  Statuses,
  UploadPhotos,
} from "../models/models.js";
import sequelize from "../db.js";

class ConsultationService {
  async add(
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
  ) {
    if (!full_name || !email || !phone || !street || !state || !zip) {
      throw ApiError.badRequest("Fill in all the details!");
    }

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailValid.test(email)) {
      throw ApiError.badRequest("Email misspelling!");
    }

    const transaction = await sequelize.transaction();

    const { id: service_type_id } = await ServiceType.findOne({
      where: { name: service_type },
      raw: true,
    });

    if (!service_type_id) {
      throw ApiError.badRequest("Service type not found!");
    }

    const { limits, id, booked } = await SelectDateTime.findOne({
      where: { date, time },
      raw: true,
    });

    if (booked >= limits) {
      throw ApiError.badRequest("Limit is full!");
    }

    // Убедитесь, что директория для файлов существует, если нет, создайте
    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "static"
    );
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    const files = Array.isArray(uploaded) ? uploaded : [uploaded];

    // Проверим, что файлы действительно существуют
    if (!files || files.length === 0) {
      throw ApiError.badRequest("No files uploaded!");
    }

    const savedPaths = [];

    // Функция для асинхронного перемещения файла
    const moveFile = (file) => {
      return new Promise((resolve, reject) => {
        const fileName = `${Date.now()}_${file.name}`;
        const savePath = path.join(filePath, fileName);

        // Перемещаем файл
        file.mv(savePath, (err) => {
          if (err) {
            reject(new Error("Upload error!"));
          } else {
            resolve(fileName); // Возвращаем имя файла после успешного перемещения
          }
        });
      });
    };

    try {
      // Массив промисов для всех файлов
      const moveFilePromises = files.map((file) => moveFile(file));
      const fileNames = await Promise.all(moveFilePromises); // Ждем завершения всех операций

      savedPaths.push(...fileNames); // Добавляем все имена файлов в массив savedPaths

      console.log(savedPaths); // Логируем сохраненные пути

      // Обновляем количество забронированных мест
      await SelectDateTime.update(
        { booked: booked + 1 },
        { where: { id }, transaction }
      );

      // Создаем консультацию
      const newConsultation = await Consultation.create(
        {
          full_name,
          email,
          phone,
          street,
          state,
          zip,
          descriptions,
          service_type_id,
          slect_date_time_id: id,
        },
        { transaction }
      );

      // Добавляем пути к загруженным файлам в таблицу UploadPhotos
      for (const file_name of savedPaths) {
        await UploadPhotos.create(
          {
            consultation_id: newConsultation.id,
            file_name,
          },
          { transaction }
        );
      }

      // Завершаем транзакцию
      await transaction.commit();

      return { message: "The message has been sent." };
    } catch (err) {
      await transaction.rollback();
      console.error(err);
      throw ApiError.badRequest("Error uploading files.");
    }
  }

  async update(id, name) {
    const findConsultation = await Consultation.findOne({ where: { id } });

    const findStatus = await Statuses.findOne({ where: { name } });

    if (!findConsultation) {
      throw ApiError.badRequest("Consultation not found!");
    }

    if (!findStatus) {
      throw ApiError.badRequest("Status not found!");
    }

    await Consultation.update({ status_id: findStatus.id }, { where: { id } });

    return { message: "Status has been successfully updated!" };
  }

  async getAll(limit, page) {
    page = page || 1;
    limit = limit || 20;
    let offset = page * limit - limit;

    const data = await Consultation.findAndCountAll({
      page,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: SelectDateTime,
          as: "select_date_time",
          attributes: ["date", "time"],
        },
        {
          model: ServiceType,
          as: "service_type",
          attributes: ["name"],
        },
        {
          model: Statuses,
          as: "status",
          attributes: ["name", "color"],
        },
        // {
        //   model: UploadPhotos,
        //   as: "photos",
        //   attributes: ["file_name"],
        // },
      ],
      raw: true,
    });

    const images = await Consultation.findAll({
      order: [["id", "DESC"]],
      attributes: ["id"],
      include: [
        {
          model: UploadPhotos,
          as: "photos",
          attributes: ["file_name"],
        },
      ],
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
      images,
    };

    return data;
  }

  async getById(id) {
    const result = await Consultation.findOne({ where: { id } });

    if (!result) {
      throw ApiError.notFound("Message not found!");
    }

    return result;
  }
}

export const consultationService = new ConsultationService();
