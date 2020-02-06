import { HandyLogger } from '../logger';
import { defaultLoggerConfig } from '../config';

let handyLogger: HandyLogger;

beforeEach(() => {
  handyLogger = new HandyLogger();
});

describe('Logger Test Cases', () => {
  test('create logger instance', () => {
    expect(handyLogger).toBeInstanceOf(HandyLogger);
  });

  test('get logger config', () => {
    expect(handyLogger.getConfig()).toMatchObject(defaultLoggerConfig);
  });
});
