import sequelize from "../db.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

export const Statuses = sequelize.define("status", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  color: { type: DataTypes.STRING, unique: true },
});

export const Message = sequelize.define("message", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT },
});

export const SelectDateTime = sequelize.define("select_date_time", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  date: { type: DataTypes.STRING, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
  limits: { type: DataTypes.INTEGER, allowNull: false },
});

export const ServiceType = sequelize.define("service_type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

export const Consultation = sequelize.define("consultation", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  full_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: false },
  street: { type: DataTypes.STRING, allowNull: false },
  state: { type: DataTypes.STRING, allowNull: false },
  zip: { type: DataTypes.STRING, allowNull: false },
  descriptions: { type: DataTypes.STRING },
});

export const UploadPhotos = sequelize.define("upload_photos", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  file_name: { type: DataTypes.STRING, allowNull: false },
});

Statuses.hasMany(Message, { as: "messages", foreignKey: "status_id" });
Message.belongsTo(Statuses, { as: "status", foreignKey: "status_id" });

Statuses.hasMany(Consultation, {
  as: "consultations",
  foreignKey: "status_id",
});
Consultation.belongsTo(Statuses, { as: "status", foreignKey: "status_id" });

Consultation.hasMany(UploadPhotos, {
  as: "photos",
  foreignKey: "consultation_id",
});

UploadPhotos.belongsTo(Consultation, {
  as: "consultation",
  foreignKey: "consultation_id",
});

ServiceType.hasMany(Consultation, {
  as: "сonsultations",
  foreignKey: "service_type_id",
});
Consultation.belongsTo(ServiceType, {
  as: "service_type",
  foreignKey: "service_type_id",
});

SelectDateTime.hasMany(Consultation, {
  as: "select",
  foreignKey: "slect_date_time_id",
});
SelectDateTime.belongsTo(ServiceType, {
  as: "slect_date_time",
  foreignKey: "slect_date_time_id",
});
