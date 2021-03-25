import winston from 'winston'

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message} ${JSON.stringify(info.extensions)}`,
  ),
)
const transports = [
  new winston.transports.Console({ level: 'info' }),
  new winston.transports.File({
    filename: 'error.log',
    dirname: './logs/',
    level: 'warn',
    handleExceptions: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  })
]

const Logger = winston.createLogger({
  level: 'warn',
  format,
  transports,
})

export default Logger;