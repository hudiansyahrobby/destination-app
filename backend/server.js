const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");

const authRoute = require("./routes/auth");
const destinationRoute = require("./routes/destination");
const favoriteRoute = require("./routes/favorite");
const commentRoute = require("./routes/comment");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(compression());

app.use(helmet());

app.use(logger("dev"));

app.use("/api/v1", authRoute);
app.use("/api/v1", destinationRoute);
app.use("/api/v1", favoriteRoute);
app.use("/api/v1", commentRoute);

module.exports = app;
