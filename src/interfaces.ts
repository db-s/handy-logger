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

export interface EasyLoggerOptions {
  title?: string;
  level?: LogLevels | string;
  levels?: ObjectGeneric;
  transports: {
    type: TransportTypes | string;
    fileOpts?: FileTransportOptions;
    consoleOpts?: ConsoleTransportOptions;
    httpOpts?: HttpTransportOptions;
    streamOpts?: StreamTransportOptions;
    rotationOpts?: DailyRotateFileTransportOptions;
  }[];
  overrideConfig?: boolean;
  timeStampFormat?: string | (() => string);
  logDataStringCustomFormat?: (timestamp: string, level: string, message: string) => string;
  // TODO: add colorize option
  // colorize?: boolean;
}
