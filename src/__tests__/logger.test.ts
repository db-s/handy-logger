import { EasyLogger } from '../logger';
import { defaultLoggerConfig } from '../config';
import * as winston from 'winston';
import { Logger } from 'winston';

let easyLogger: EasyLogger;

beforeEach(() => {
  easyLogger = new EasyLogger();
});

describe('Logger Test Cases', () => {
  test('create logger instance', () => {
    expect(easyLogger).toBeInstanceOf(EasyLogger);
  });

  test('get logger config', () => {
    expect(easyLogger.getConfig()).toMatchObject(defaultLoggerConfig);
  });
});
