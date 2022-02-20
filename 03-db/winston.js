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
    /*
    To create a file with the error:
    new winston.transports.File({
      filename: 'winston.log',
      level: 'errors'
    })
    */
  ]
});

// The 7 levels in order
log.error('This is an error message');
log.warn('This is a warn message');
log.info('This is an info message');
log.http('This is a http message');
log.verbose('This is a verbose message');
log.debug('This is a debug message');
log.silly('This is a silly message');

const person = { id: 10, name: 'Martin', email: 'martin@email.nu'};
log.info('%s loggade precis in med lösenordet %s', person.name, person.email);