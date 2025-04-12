import { ApiError } from "../error/ApiError.js";
import {
  SelectDateTime,
  ServiceType,
  Consultation,
  Statuses,
  UploadPhotos,
} from "../models/models.js";

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

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;

    if (!emailValid.test(email)) {
      throw ApiError.badRequest("Email misspelling!");
    }

    const service_type_id = await ServiceType.findOne({
      where: { name: service_type },
      raw: true,
    }).id;

    if (!service_type_id) {
      throw ApiError.badRequest("Service type not found!");
    }

    const { limits, id, booked } = await SelectDateTime.findOne({
      where: { date, time },
      raw: true,
    });

    if (booked > limits) {
      throw ApiError.badRequest("Limit is full!");
    }

    await SelectDateTime.update(
      {
        booked: booked + 1,
      },
      { where: { id } }
    );

    const filePath = path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      "..",
      "static"
    );

    const files = Array.isArray(uploaded) ? uploaded : [uploaded];

    const savedPaths = [];

    files.forEach((file) => {
      const fileName = `${Date.now()}-${file.name}`;
      const savePath = path.join(filePath, fileName);

      file.mv(savePath, (err) => {
        if (err) {
          throw ApiError.badRequest("Upload error!");
        }
      });

      savedPaths.push(savePath);
    });

    const newConsultation = await Consultation.create({
      full_name,
      email,
      phone,
      street,
      state,
      zip,
      descriptions,
      service_type_id,
      slect_date_time_id: id,
    });

    for (const file_name of savedPaths) {
      await UploadPhotos.create({
        consultation_id: newConsultation.id,
        file_name,
      });
    }
    return { message: "The message has been sent." };
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
          as: "slect_date_time",
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
          attributes: ["name"],
        },
        {
          model: UploadPhotos,
          as: "photos",
          attributes: ["file_name"],
        },
      ],
      raw: true,
    });

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
