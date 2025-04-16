import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import fs from "fs";
import cors from "cors";
import { fileURLToPath } from "url";
import fileUpload from "express-fileupload";
import sequelize from "./db.js";
import router from "./routes/index.js";
import logger from "./utils/logger.js";
import { errorMiddlware } from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 5000;
const app = express();

const staticDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "static"
);

if (!fs.existsSync(staticDir)) {
  fs.mkdirSync(staticDir);
}

const accessLogStream = fs.createWriteStream(
  path.join(path.dirname(fileURLToPath(import.meta.url)), "logs", "access.log"),
  { flags: "a" }
);

app.use(express.json());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(staticDir));

app.use(fileUpload());
app.use("/api", router);
app.use(errorMiddlware(logger));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(`**сервер запущен на порту ${PORT}**`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
