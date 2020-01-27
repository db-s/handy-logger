import { easyLogger, EasyLogger } from '../logger';
import { defaultLoggerConfig } from '../config';

describe('Logger Test Cases', () => {
  test('logger level', () => {
    expect(easyLogger.getConfig()).toMatchObject(defaultLoggerConfig);
  });
});
