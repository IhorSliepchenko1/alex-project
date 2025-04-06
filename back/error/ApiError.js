import { HTTP_STATUSES } from "../utils/constants.js";

export class ApiError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(HTTP_STATUSES.BAD_REQUEST, message);
  }

  static unauthorized(message) {
    return new ApiError(HTTP_STATUSES.UNAUTHORIZED, message);
  }

  static forbidden(message) {
    return new ApiError(HTTP_STATUSES.FORBIDDEN, message);
  }

  static notFound(message) {
    return new ApiError(HTTP_STATUSES.NOT_FOUND, message);
  }

  static internal(message) {
    return new ApiError(HTTP_STATUSES.INTERNAL_SERVER_ERROR, message);
  }
}
