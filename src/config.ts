import { transports } from "winston";

const config: any = {
  levels: {
    error: 0,
    warn: 1,
      info: 2,
      verbose: 3,
      debug: 4,
      silly: 5
  },
  transportOptions: [
    new transports.Console()
  ],
  rotationalTransport: {
    json: true,
    filename: `../application-%DATE%.log`,
    datePattern: 'MM-DD-YYYY',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  },
  queryTransport: {
      filename: '../application-%DATE%.log',
      datePattern: 'MM-DD-YYYY',
      prepend: true,
      level: "error",
      json: true,
      timestamp: true
  }
};

export default config;
