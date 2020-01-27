import { defaultLoggerConfig } from './config';
import { createLogger, transports, Logger } from 'winston';
import { EasyLoggerOptions } from './interfaces';
import { TransportTypes } from './enums';
import { format, Format } from 'logform';
import * as TransportStream from 'winston-transport';

export class EasyLogger {
  private _config: EasyLoggerOptions;
  private _transports: TransportStream | TransportStream[] | undefined = [];
  private logger: Logger;
  
  constructor(protected opts?: EasyLoggerOptions) {
    this._config = defaultLoggerConfig;
    
    if (opts?.overrideConfig === true) {
      Object.assign(this._config, opts);
    } else {
      this._config = opts || defaultLoggerConfig;
    }

    this.configureTransport();
    this.logger = this.createLoggerInstance();
  }

  private configureTransport(): void {
    for (const tp of this._config.transports) {
      let _transport: TransportStream | null = null;

      switch (tp.type) {
        case TransportTypes.console:
        default:
          _transport = new transports.Console(tp.consoleOpts);
          break;

        case TransportTypes.dailyRotateFile:
          if (tp.rotationOpts) {
            _transport = new (transports.DailyRotateFile)(tp.rotationOpts);
          }
          break;

        case TransportTypes.file:
          _transport = new transports.File(tp.fileOpts);
          break;

        case TransportTypes.http:
          _transport = new transports.Http(tp.httpOpts);
          break;

        case TransportTypes.stream:
          _transport = new transports.Stream(tp.streamOpts);
          break;
      }

      if (_transport && Array.isArray(this._transports)) {
        this._transports.push(_transport);
      }
    }

    if (!this._transports || (Array.isArray(this._transports) && this._transports.length === 0)) {
      throw new Error('Error in setting up logger transport');
    }
  }

  private formatDateString(ts?: string): string {
    try {
      if (typeof this._config.timeStampFormat === 'function') {
        return this._config.timeStampFormat();
      } else {
        const dateNow: Date = ts
        ? new Date(ts)
        : new Date(Date.now());
        return dateNow.toUTCString();
      }
    } catch (e) {
      return new Date(Date.now()).toUTCString();
    }
  }

  private formatLogDataString(ts: string, level: string, message: string): string {
    if (typeof this._config.logDataStringCustomFormat === 'function') {
      return this._config.logDataStringCustomFormat(ts, level, message);
    } else {
      return `${ts} | ${this._config.title} | ${level.toUpperCase()} | ${message}`;
    }
  }

  private createLoggerInstance(): Logger {
    const alignedWithColorsAndTime: Format = format.combine(
      format.json(),
      // TODO: color customization will be added later
      // format.colorize({ message: this._config.colorize }),
      format.timestamp({
        format: (typeof this._config.timeStampFormat === 'string')
          ? this._config.timeStampFormat
          : this.formatDateString.bind(this),
      }),
      format.align(),
      format.printf(info => this.formatLogDataString(info.timestamp, info.level, info.message)),
    );

    const logger: Logger = createLogger({
      level: this._config.level,
      format: alignedWithColorsAndTime,
      exitOnError: false,
      transports: this._transports,
    });

    return logger;
  }

  public getConfig(): EasyLoggerOptions {
    return this._config;
  }

  public getLogger(): Logger {
    return this.logger;
  }

  public clearLogger(): void {
    this.logger.clear();
  }
}

export const easyLogger: EasyLogger = new EasyLogger();
export type EasyLoggerBase = Logger;
