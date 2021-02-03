const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const path = require("path");

const authRoute = require("./routes/auth");
const destinationRoute = require("./routes/destination");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(compression());

app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(logger("dev"));

app.use("/api/v1", authRoute);
app.use("/api/v1", destinationRoute);

module.exports = app;
