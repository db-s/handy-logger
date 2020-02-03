import { EasyLoggerOptions } from './interfaces';
import { LogLevels } from './enums';

export const defaultLoggerConfig: EasyLoggerOptions = {
  title: 'Sample App',
  level: LogLevels.silly,
  transports: {
    console: [{}],
  },
  overrideConfig: true,
};
