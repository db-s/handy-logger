import { defaultLoggerConfig } from './config';
import { createLogger, transports, Logger, LoggerOptions } from 'winston';
import { HandyLoggerOptions, HandyLoggerTransportOptions } from './interfaces';
import { TransportTypes } from './enums';
import { format, Format } from 'logform';
import * as TransportStream from 'winston-transport';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import {
  ConsoleTransportOptions,
  FileTransportOptions,
  HttpTransportOptions,
  StreamTransportOptions,
} from 'winston/lib/winston/transports';

/**
 * HandyLogger class is built on top of winston library which takes a set
 * of configuration and creates a new instance of winston logger
 *
 * @export
 * @class HandyLogger
 */
export class HandyLogger {
  private _config: HandyLoggerOptions;
  private _transports: TransportStream | TransportStream[] | undefined = [];
  private winstonConfig: LoggerOptions = {};
  private logger: Logger;

  constructor(protected opts?: HandyLoggerOptions) {
    this._config = defaultLoggerConfig;
    Object.assign(this._config, opts);

    this.validateConfig();
    this.configureTransport();
    this.setWinstonConfig();
    this.logger = this.createLoggerInstance();
  }

  private validateConfig(): void {
    if (
      !this._config?.transports ||
      (Array.isArray(this._config?.transports) && this._config?.transports.length === 0)
    ) {
      throw new Error('Transport must be added if default config is not overridden.');
    }
  }

  private setWinstonConfig(): void {
    const alignedWithColorsAndTime: Format = format.combine(
      format.json(),
      // TODO: color customization will be added later
      // format.colorize({ message: this._config.colorize }),
      format.timestamp({
        format:
          typeof this._config.timeStampFormat === 'string'
            ? this._config.timeStampFormat
            : this.formatDateString.bind(this),
      }),
      format.align(),
      format.printf((info) => this.formatLogDataString(info.timestamp, info.level, info.message)),
    );

    // TODO:
    // ** add custom log `levels` with correct configuration and typing with a solution to custom
    // log level typings
    // https://github.com/winstonjs/winston/issues/1523

    this.winstonConfig = {
      level: this._config.level,
      format: alignedWithColorsAndTime,
      exitOnError: this._config.exitOnError,
      transports: this._transports,
    };
  }

  private configureTransport(): void {
    for (const [tpType, tpOpts] of Object.entries(this._config.transports!)) {
      tpOpts.map((item: HandyLoggerTransportOptions): void => {
        let _transport: TransportStream | undefined;

        switch (tpType) {
          case TransportTypes.Console:
          default:
            _transport = new transports.Console(item as ConsoleTransportOptions);
            break;

          case TransportTypes.Rotate:
            _transport = new transports.DailyRotateFile(item as DailyRotateFileTransportOptions);
            break;

          case TransportTypes.File:
            _transport = new transports.File(item as FileTransportOptions);
            break;

          case TransportTypes.Http:
            _transport = new transports.Http(item as HttpTransportOptions);
            break;

          case TransportTypes.Stream:
            _transport = new transports.Stream(item as StreamTransportOptions);
            break;
        }

        if (_transport && Array.isArray(this._transports)) {
          this._transports.push(_transport);
        }
      });
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
        const dateNow: Date = ts ? new Date(ts) : new Date(Date.now());

        return dateNow.toUTCString();
      }
    } catch (e) {
      return new Date(Date.now()).toUTCString();
    }
  }

  private formatLogDataString(ts: string, level: string, message: string): string {
    if (typeof this._config.logDataStringCustomFormat === 'function') {
      return this._config.logDataStringCustomFormat(ts, level, this._config?.title || '', message);
    } else {
      let msg = ts ? `${ts} | ` : '';

      msg += this._config.title ? `${this._config.title} | ` : '';
      msg += level ? `${level.toUpperCase()} | ` : '';
      msg += message || '';

      return msg;
    }
  }

  private createLoggerInstance(): Logger {
    const logger: Logger = createLogger(this.winstonConfig);

    return logger;
  }

  public getConfig(): HandyLoggerOptions {
    return this._config;
  }

  public getLogger(): Logger {
    return this.logger;
  }
}

export type HandyLoggerBase = Logger;
