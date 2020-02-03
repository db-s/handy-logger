import {
  FileTransportOptions,
  ConsoleTransportOptions,
  HttpTransportOptions,
  StreamTransportOptions,
} from 'winston/lib/winston/transports';
import { DailyRotateFileTransportOptions } from 'winston-daily-rotate-file';
import { TransportTypes, LogLevels } from './enums';

export interface ObjectGeneric {
  [key: string]: any;
}

export interface EasyLoggerTransportType {
  type: TransportTypes | string;
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
  transports: EasyLoggerTransport;
  overrideConfig?: boolean;
  timeStampFormat?: string | (() => string);
  logDataStringCustomFormat?: (timestamp: string, level: string, message: string) => string;
  // TODO: add colorize option
  // colorize?: boolean;
}
