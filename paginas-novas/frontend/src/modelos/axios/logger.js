// logger.js
const winston = require('winston');
const SentryTransport = require('winston-transport-sentry-node').default;

const logger = winston.createLogger({
  level: 'info',
  transports: [
    new winston.transports.Console(),
    new SentryTransport({
      sentry: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.NODE_ENV || 'development',
      },
      level: 'error',
    }),
  ],
});

module.exports = logger;
