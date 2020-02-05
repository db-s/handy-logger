import { EasyLoggerOptions } from './interfaces';
import { LogLevels } from './enums';

export const defaultLoggerConfig: EasyLoggerOptions = {
  level: LogLevels.Silly,
  transports: {
    console: [{}],
  },
};
