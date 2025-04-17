import bcrypt from "bcryptjs";
import { User } from "../models/models.js";
import { ApiError } from "../error/ApiError.js";
import { generateJwt } from "../utils/generate-token.js";
import { ROLE } from "../utils/constants.js";

class UserService {
  async add(login, password, role) {
    if (!login || !password) {
      throw ApiError.notFound("Login and password are required!");
    }

    if (password.length < 6) {
      throw ApiError.badRequest("Password must be at least 6 characters long!");
    }

    const candidate = await User.findOne({ where: { login } });

    if (candidate) {
      throw ApiError.badRequest(`${login} already exists`);
    }

    const roleList = Object.values(ROLE);

    if (!roleList.includes(role)) {
      throw ApiError.badRequest("Unknown role");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      login,
      password: hashPassword,
      role: role ? role : ROLE.VIEWER,
    });

    return `${user.login} has been added!`;
  }

  async login(login, password) {
    if (!login || !password) {
      throw ApiError.notFound("Login and password are required!");
    }

    const user = await User.findOne({ where: { login } });

    if (!user) {
      throw ApiError.badRequest(`User ${login} not found`);
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      throw ApiError.unauthorized("Incorrect login or password");
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
      throw ApiError.badRequest(`${id} not found`);
    }

    if (newPassword && oldPassword) {
      let isMatch;

      if (oldPassword) {
        isMatch = bcrypt.compareSync(oldPassword, user.password);

        if (!isMatch) {
          throw ApiError.badRequest("Old password does not match");
        }
      }

      if (newPassword && newPassword.length < 6) {
        throw ApiError.badRequest(
          "Password must be at least 6 characters long!"
        );
      }

      if (newPassword === oldPassword) {
        throw ApiError.badRequest("New password must be different!");
      }
    }

    const hashPassword = newPassword
      ? await bcrypt.hash(newPassword, 12)
      : undefined;

    const updateFields = {};
    if (login && user.login !== login) updateFields.login = login;
    if (hashPassword) updateFields.password = hashPassword;
    if (role && user.role !== role) updateFields.role = role;


    await User.update(updateFields, { where: { id } });

    return user;
  }

  async delete(id) {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      throw ApiError.notFound("User not found!");
    }

    await User.destroy({ where: { id: user.id } });

    return { message: `${user.login} has been deleted` };
  }

  async check(user) {
    const { id, login, role } = user;
    const token = generateJwt(id, login, role);
    return token;
  }
}

export const userService = new UserService();
