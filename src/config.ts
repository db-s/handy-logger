import { HandyLoggerOptions } from './interfaces';
import { LogLevels } from './enums';

export const defaultLoggerConfig: HandyLoggerOptions = {
  level: LogLevels.Silly,
  transports: {
    console: [{}],
  },
};
