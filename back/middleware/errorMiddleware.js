import { formatInTimeZone } from "date-fns-tz";

export const errorMiddlware = (logger) => {
  return (err, req, res, next) => {
    const status = err.status || 500;

    logger.error({
      message: err.message,
      status,
      cause: err.cause,
      timestamp: formatInTimeZone(
        new Date(),
        "Europe/Kiev",
        "dd.MM.yyyy HH:mm:ss XXX"
      ),
    });

    res.status(status).json({
      message: err.message || "Что-то пошло не так",
    });
  };
};
