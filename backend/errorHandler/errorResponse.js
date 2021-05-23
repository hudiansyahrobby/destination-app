const { logger } = require("../helpers/logger");

exports.sendErrorDev = (err, res) => {
  console.log("STA", err.status);
  if (err.status === 500) {
    res.status(500).json({
      message: "Something went very wrong!",
      status: 500,
      error: {
        message: "Something went very wrong!",
        type: "server-error",
      },
    });
  } else {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
      error: {
        message: err.message,
        type: err.type,
      },
      stack: err.stack,
    });
  }
};

exports.sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.status).json({
      message: err.message,
      status: err.status,
      error: {
        message: err.message,
        type: err.type,
      },
    });

    // Programming or other unknown error
  } else {
    // 1) Log error
    logger.log({ level: "error", message: err });

    // 2) Send generic message
    res.status(500).json({
      message: "Something went very wrong!",
      status: 500,
      error: {
        message: "Something went very wrong!",
        type: "server-error",
      },
    });
  }
};
