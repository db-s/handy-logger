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

export interface EasyLoggerTransportTypeFile {
  file: FileTransportOptions[];
}

export interface EasyLoggerTransportTypeConsole {
  console: ConsoleTransportOptions[];
}

export interface EasyLoggerTransportTypeHTTP {
  http: HttpTransportOptions[];
}

export interface EasyLoggerTransportTypeStream {
  stream: StreamTransportOptions[];
}

export interface EasyLoggerTransportTypeRotate {
  rotate: DailyRotateFileTransportOptions[];
}

export type EasyLoggerTransport =
  | EasyLoggerTransportTypeFile
  | EasyLoggerTransportTypeConsole
  | EasyLoggerTransportTypeHTTP
  | EasyLoggerTransportTypeStream
  | EasyLoggerTransportTypeRotate;

export type EasyLoggerTransportOptions =
  | FileTransportOptions
  | ConsoleTransportOptions
  | HttpTransportOptions
  | StreamTransportOptions
  | DailyRotateFileTransportOptions;

export interface EasyLoggerOptions {
  title?: string;
  level?: LogLevels | string;
  levels?: ObjectGeneric;
  transports?: EasyLoggerTransport;
  timeStampFormat?: string | (() => string);
  logDataStringCustomFormat?: (
    timestamp: string,
    level: string,
    title: string,
    message: string,
  ) => string;
  // TODO: add colorize option
  // colorize?: boolean;
}
