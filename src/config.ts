import { EasyLoggerOptions } from './interfaces';
import { LogLevels, TransportTypes } from './enums';

export const defaultLoggerConfig: EasyLoggerOptions = {
  title: 'Sample App',
  level: LogLevels.silly,
  colorize: true,
  transports: [
    {
      type: TransportTypes.console,
      consoleOpts: {},
      rotation: false,
    }
  ],
  overrideConfig: true,
};
