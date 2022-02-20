const winston = require('winston');

// changing the order of the output
const myFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level} ${message}`;
});

const log = winston.createLogger({
  // There's 7 levels. It consoles all up to the one you choose within level
  level: 'info',
  // Format decides how the information logged should show. i.e: with color, time etc
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.splat(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

module.exports = log;