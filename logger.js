const winston = require("winston");

// Create a custom Winston logger with transports for errors and info
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSSZ" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "access.log" }), // Log info messages
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log error messages
  ],
});
module.exports = logger;
