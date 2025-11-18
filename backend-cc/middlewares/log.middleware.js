const winston = require('winston');
require('winston-daily-rotate-file');
const encriptarjsong = require('./../util/encriptarjson');

// Carpeta de logs
const logDir = 'logs';

// Transporte para rotación diaria
const transport = new winston.transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-requests.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

// Logger principal
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      info => `[${info.timestamp}] ${info.message}`
    )
  ),
  transports: [
    transport,
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Middleware de Express
const loggerMiddleware = (req, res, next) => {
  const start = Date.now();
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress;
  const method = req.method;
  const url = req.originalUrl;
  const user = req.user ? req.user.username : 'anonimo';

  let body = '{}';

  try {
    if (req.body?.resultado) {
      const desencriptado = encriptarjsong.decrypt(req.body.resultado);
      body = JSON.stringify(desencriptado || {});
    }else{

    }
  } catch (error) {
    body = '{"error":"No se pudo desencriptar el cuerpo"}';
  }

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${method} ${url} usuario: ${user} ip: ${ip} status: ${res.statusCode} duration: ${duration}ms body: ${body}`;
    logger.info(logMessage);
  });

  next();
};


module.exports = loggerMiddleware;
