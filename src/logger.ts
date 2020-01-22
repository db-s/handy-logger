import * as winston from 'winston';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
import config from './config';
import { createLogger, transports } from 'winston';
import { format } from 'winston';
import * as path from 'path';
import * as shelljs from 'shelljs';
import { TransformConfig, TransportOption } from './interfaces/transport.interface';
// import { format } from 'logform';

const { combine, timestamp, label, printf, prettyPrint } = format;

export class Logger {
  public transFormConfig: any;
  
  constructor(protected transformConfig: TransformConfig) {
    this.setRotationalTransformObj(transformConfig);
  }

  public getLevels() {
    return config.levels;
  }

  private setRotationalTransformObj(transformConfig: any) {
    this.transFormConfig = config.rotationalTransport;
    if (transformConfig) {
      // tslint:disable-next-line: forin
      for (const property in transformConfig) {
        this.transFormConfig[property] = transformConfig[property];
      }
    }
  }

  private configurePrettylog(transportOptions: TransportOption, alignedWithColorsAndTime: any) {
    const { title, level, message } = transportOptions;
    const logger = createLogger({
      format: alignedWithColorsAndTime,
      transports: config.transportOptions
    });

    logger.log(level, message);
  }

  private async createLogInstance(transportOptions: TransportOption) {
    const transport = new (winston.transports.DailyRotateFile)(this.transFormConfig);
    const { title } = transportOptions;
    const alignedWithColorsAndTime = format.combine(
      format.json(),
      format.colorize(),
      format.timestamp(),
      format.align(),
      format.printf(info => `${info.timestamp} ${title} ${info.level}: ${info.message}`)
    );

    this.configurePrettylog(transportOptions, alignedWithColorsAndTime);
    const logger = winston.createLogger({
      format: alignedWithColorsAndTime,
      transports: [transport]
    });

    return logger;
  }

  private async createGenericLoggerInstance() {
    const transport = new (winston.transports.DailyRotateFile)(config.queryTransport);
    const logger = winston.createLogger({
      transports: [transport]
    });

    return logger;
  }

  public async log(logOptions: TransportOption) {
    try {
      const { level, message } = logOptions;
      const logger = await this.createLogInstance(logOptions);
      logger.log({
        level,
        message
      });
    } catch (e) {
      console.error('Exception', e);
      throw e;
    }
  }

  public async removeAllTransports(logOptions: TransportOption) {
    const logger = await this.createLogInstance(logOptions);
    logger.clear();
  }

  public async queryLog(searchterm: string) {
    try {
      const rs = shelljs.grep(searchterm, path.resolve(__dirname, "../application-01-16-2020.log"))
      return rs.stdout;
    } catch (e) {
      console.error('Exception', e);
      throw e;
    }
  }
}
