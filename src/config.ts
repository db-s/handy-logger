import { EasyLoggerOptions } from './interfaces';
import { LogLevels, TransportTypes } from './enums';

export const defaultLoggerConfig: EasyLoggerOptions = {
  title: 'Sample App',
  level: LogLevels.silly,
  transports: [
    {
      type: TransportTypes.console,
      consoleOpts: {},
    },
  ],
  overrideConfig: true,
};
