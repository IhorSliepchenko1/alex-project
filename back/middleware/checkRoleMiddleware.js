import jwt from "jsonwebtoken";
import { ApiError } from "../error/ApiError.js";

export const checkRoleMiddleware = (roles) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(ApiError.unauthorized("Пользователь не авторизован"));
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);

      if (!roles.includes(decoded.role)) {
        return next(ApiError.forbidden("Нет доступа"));
      }

      req.user = decoded;
      next();
    } catch (error) {
      return next(ApiError.unauthorized("Неверный токен"));
    }
  };
};
