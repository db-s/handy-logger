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
          if (tp.rotation === true) {
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
      const dateNow: Date = ts
      ? new Date(ts)
      : new Date(Date.now());
      return dateNow.toUTCString();
    } catch (e) {
      return new Date(Date.now()).toUTCString();
    }
  }

  private formatLogDataString(level: string, message: string, ts: string): string {
    return `${this.formatDateString(ts)} - ${level.toUpperCase()} - ${this._config.title} - ${message}`;
  }

  private createLoggerInstance(): Logger {
    const alignedWithColorsAndTime: Format = format.combine(
      // format.json(),
      format.colorize(),
      format.timestamp(),
      // format.align(),
      format.printf(info => this.formatLogDataString(info.level, info.message, info.timestamp))
    );

    const logger: Logger = createLogger({
      level: this._config.level,
      format: alignedWithColorsAndTime,
      exitOnError: false,
      transports: this._transports,
    });

    return logger;
  }

  public getLoggerConfigs(): EasyLoggerOptions {
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
export type LoggerBase = Logger;
