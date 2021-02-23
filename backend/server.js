const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
// const csrf = require("csurf");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const authRoute = require("./routes/auth");
const destinationRoute = require("./routes/destination");
const favoriteRoute = require("./routes/favorite");
const commentRoute = require("./routes/comment");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());

// app.use(
//   csrf({
//     cookie: {
//       httpOnly: true,
//     },
//   })
// );

app.use(compression());

app.use(helmet());

app.use(logger("dev"));

// app.all("*", (req, res) => {
//   console.log(req.headers);
//   res.cookie("XSRF-TOKEN", req.csrfToken());
// });

// app.use((req, res, next) => {
//   const csrfTokenToSendToFrontEnd = req.csrfToken();
//   console.log("csrfTokenToSendToFrontEnd: ", csrfTokenToSendToFrontEnd);
//   // this cookie must be XSRF-TOKEN, because already defined as default in Angular.
//   res.cookie("XSRF-TOKEN", csrfTokenToSendToFrontEnd);
//   next();
// });

// app.use((err, req, res, next) => {
//   // console.log(req.headers);
//   if (err.code !== "EBADCSRFTOKEN") return next(err);
//   return res.status(403).json({ message: "Invalid CSRF Token" });
// });

app.use("/api/v1", authRoute);
app.use("/api/v1", destinationRoute);
app.use("/api/v1", favoriteRoute);
app.use("/api/v1", commentRoute);

app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") {
    return next(err);
  }
  res.status(403).json({
    message: err,
  });
});

module.exports = app;
