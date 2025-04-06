import bcrypt from "bcryptjs";
import { User } from "../models/models.js";
import { ApiError } from "../error/ApiError.js";
import { generateJwt } from "../utils/generate-token.js";
import { ROLE } from "../utils/constants.js";

class UserService {
  async add(login, password, role) {
    if (!login || !password) {
      throw ApiError.notFound("Логин и пароль обязательны!");
    }

    if (password.length < 6) {
      throw ApiError.badRequest("Минимальная длина пароля 6 символов!");
    }

    const candidate = await User.findOne({ where: { login } });

    if (candidate) {
      throw ApiError.badRequest(`${login} уже существует`);
    }

    const roleList = Object.values(ROLE);

    if (!roleList.includes(role)) {
      throw ApiError.badRequest("Не известная роль");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      login,
      password: hashPassword,
      role: role ? role : ROLE.VIEWER,
    });

    return `${user.login} добавлен!`;
  }

  async login(login, password) {
    if (!login || !password) {
      throw ApiError.notFound("Логин и пароль обязательны!");
    }

    const user = await User.findOne({ where: { login } });

    if (!user) {
      throw ApiError.badRequest(`Пользователь ${login} не найден`);
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw ApiError.unauthorized("Указан неверный логин или пароль");
    }

    const token = generateJwt(user.id, user.login, user.role);

    return token;
  }

  async getAll() {
    const data = await User.findAll({
      attributes: ["id", "login", "role"],
      order: [["createdAt", "ASC"]],
      raw: true,
    });

    return data;
  }

  async updateUser(id, login, newPassword, oldPassword, role) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw ApiError.badRequest(`${id} не найден`);
    }

    if (newPassword && oldPassword) {
      let isMatch;

      if (oldPassword) {
        isMatch = bcrypt.compareSync(oldPassword, user.password);

        if (!isMatch) {
          throw ApiError.badRequest("Старый пароль не совпадает");
        }
      }

      if (newPassword && newPassword.length < 6) {
        throw ApiError.badRequest("Минимальная длина пароля 6 символов!");
      }

      if (newPassword === oldPassword) {
        throw ApiError.badRequest("Новый пароль должен отличаться!");
      }
    }

    const hashPassword = newPassword
      ? await bcrypt.hash(newPassword, 12)
      : undefined;

    const updateFields = {};
    if (login && user.login !== login) updateFields.login = login;
    if (hashPassword) updateFields.password = hashPassword;
    if (role && user.role !== role) updateFields.role = role;

    console.log(updateFields);

    await User.update(updateFields, { where: { id } });

    return user;
  }

  async delete(id) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw ApiError.notFound("Пользователь не обнаружен!");
    }

    await User.destroy({ where: { id: user.id } });

    return { message: `${user.login} удалён` };
  }

  async check(user) {
    const { id, login, role } = user;
    const token = generateJwt(id, login, role);
    return token;
  }
}

export const userService = new UserService();
