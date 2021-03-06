import {
  FileTransportOptions,
  ConsoleTransportOptions,
  HttpTransportOptions,
  StreamTransportOptions,
} from 'winston/lib/winston/transports';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import { LogLevels } from './enums';

export interface ObjectGeneric {
  [key: string]: any;
}

export interface HandyLoggerTransportTypeFile {
  file: FileTransportOptions[];
}

export interface HandyLoggerTransportTypeConsole {
  console: ConsoleTransportOptions[];
}

export interface HandyLoggerTransportTypeHTTP {
  http: HttpTransportOptions[];
}

export interface HandyLoggerTransportTypeStream {
  stream: StreamTransportOptions[];
}

export interface HandyLoggerTransportTypeRotate {
  rotate: DailyRotateFileTransportOptions[];
}

export type HandyLoggerTransport =
  | HandyLoggerTransportTypeFile
  | HandyLoggerTransportTypeConsole
  | HandyLoggerTransportTypeHTTP
  | HandyLoggerTransportTypeStream
  | HandyLoggerTransportTypeRotate;

export type HandyLoggerTransportOptions =
  | FileTransportOptions
  | ConsoleTransportOptions
  | HttpTransportOptions
  | StreamTransportOptions
  | DailyRotateFileTransportOptions;

export interface HandyLoggerOptions {
  title?: string;
  level?: LogLevels | string;
  transports?: HandyLoggerTransport;
  timeStampFormat?: string | (() => string);
  logDataStringCustomFormat?: (
    timestamp: string,
    level: string,
    title: string,
    message: string,
  ) => string;
  exitOnError?: boolean;
  // TODO: add custom log levels
  // levels?: winston.config.AbstractConfigSetLevels;
  // TODO: add colorize option
  // TODO: add syslog transport option
}
