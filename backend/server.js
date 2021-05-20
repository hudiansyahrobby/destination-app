const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
require("dotenv").config();
const logger = require("./helpers/logger");
const { sendErrorDev, sendErrorProd } = require("./errorHandler/errorResponse");

const authRoute = require("./routes/auth");
const destinationRoute = require("./routes/destination");
const favoriteRoute = require("./routes/favorite");
const commentRoute = require("./routes/comment");
const categoryRoute = require("./routes/category");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(compression());

app.use(helmet());

// Swagger Documentatios

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Destination App API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000/api/v1",
      },
    ],
  },
  apis: ["./docs/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", authRoute);
app.use("/api/v1", destinationRoute);
app.use("/api/v1", favoriteRoute);
app.use("/api/v1", commentRoute);
app.use("/api/v1", categoryRoute);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!`,
      404,
      "not-found"
    )
  );
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    if (err?.response) {
      logger.log({ level: "error", message: err.response.data.message });
      sendErrorDev(err.response.data, res);
    } else {
      logger.log({ level: "error", message: err.message });
      err.status = err.status || 500;
      sendErrorDev(err, res);
    }
  } else if (process.env.NODE_ENV === "production") {
    if (err?.response) {
      logger.log({ level: "error", message: err.response.data.message });
      sendErrorProd(err.response.data, res);
    } else {
      logger.log({ level: "error", message: err.message });
      err.status = err.status || 500;
      sendErrorProd(err, res);
    }
  }
});

process.on("unhandledRejection", (err) => {
  logger.log({
    level: "error",
    message: `${err.name} - ${err.message}`,
  });
  logger.log({
    level: "info",
    message: "UNHANDLED REJECTION! 💥 Shutting down...",
  });
});

process.on("uncaughtException", (err) => {
  logger.log({
    level: "error",
    message: `${err.name} - ${err.message}`,
  });
  logger.log({
    level: "info",
    message: "UNHANDLED REJECTION! 💥 Shutting down...",
  });

  process.exit(1);
});

module.exports = app;
