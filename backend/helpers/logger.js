const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint } = format;

const timezoned = () => {
  return new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Makassar",
    hour12: true,
  });
};

module.exports = logger = createLogger({
  format: combine(
    timestamp({
      format: timezoned,
    }),
    prettyPrint()
  ),
  transports: [new transports.Console()],
});
