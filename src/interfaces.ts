import { FileTransportOptions, ConsoleTransportOptions, HttpTransportOptions, StreamTransportOptions } from 'winston/lib/winston/transports';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import { TransportTypes, LogLevels } from './enums';

export interface ObjectGeneric {
  [key: string]: any;
}

export interface TransformConfig {
  filename?: string,
  datePattern?: string,
  zippedArchive?: boolean,
  maxSize?: string,
  maxFiles?: string,
}

export interface TransportOption {
  title: string,
  level: string,
  message?: any,
}

export interface EasyLoggerOptions {
  title?: string,
  level?: LogLevels | string,
  levels?: ObjectGeneric,
  colorize?: boolean,
  transports: {
    type: TransportTypes | string,
    fileOpts?: FileTransportOptions,
    consoleOpts?: ConsoleTransportOptions,
    httpOpts?: HttpTransportOptions,
    streamOpts?: StreamTransportOptions,
    rotation?: boolean,
    rotationOpts?: DailyRotateFileTransportOptions,
  }[],
  overrideConfig?: boolean,
  timeStampFormat?: string | (() => string),
  logDataStringCustomFormat?: (timestamp:string, level:string, message:string) => string,
}
