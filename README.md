# Handy Logger

![Version](https://img.shields.io/npm/v/handy-logger)
[![Build Status](https://travis-ci.org/db-s/handy-logger.svg?branch=master)](https://travis-ci.org/db-s/handy-logger)
![License](https://img.shields.io/npm/l/handy-logger)
![Minified Size](https://img.shields.io/bundlephobia/min/handy-logger)
![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/handy-logger)

An easy log handler for Node.js application which is built on top of popular logger library `winston`.

## Installation

```sh
npm i handy-logger
```

***

## Get started

### Import library

```javascript
import { HandyLogger, HandyLoggerBase } from 'handy-logger';
```

### HandyLogger

HandyLogger class creates a new logger instance with default or custom configuration.

#### Create logger with default configuration

```javascript
const HandyLogger = new HandyLogger();
```

#### or with custom configuration

```javascript
const myLogger = new HandyLogger(opts);
```

`opts` config has following properties -

| Option                    | Type                                                                           | Default           | Description                                                                                                                                                                                                                                                       |
|---------------------------|--------------------------------------------------------------------------------|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| title                     | string                                                                         | `undefined`       | Application title can be provided which will be prefixed (or customized using `logDataStringCustomFormat` method) in log messages.                                                                                                                                |
| level                     | LogLevels \| string                                                            | `silly`           | Log level depending which different kind of log will be written. Read more [here](https://github.com/winstonjs/winston#logging-levels).                                                                                                                           |
| levels                    | object                                                                         | `undefined`       | Custom log levels. Read more [here](https://github.com/winstonjs/winston#using-custom-logging-levels).                                                                                                                                                            |
| transports                | HandyLoggerTransport                                                            | `{console: [{}]}` | A transport is essentially a storage device for your logs. Like winston, handy-logger accepts multiple transports such as `console`, `file` etc. Read more [here](https://github.com/winstonjs/winston#transports). |
| timeStampFormat           | (string \| (() => string))                                                     | `undefined`       | Custom timestamp format. It can be a string accepted by [fetcha](https://github.com/taylorhakes/fecha) module or a method that returns formatted date.                                                                                                            |
| logDataStringCustomFormat | ((timestamp: string, level: string, title: string, message: string) => string) | `undefined`       | Custom log message format. You can pass a method with timestamp, level, title and message and return a formatted string as you want.                                                                                                                              |

Transport options (`HandyLoggerTransport`) are as follows -

* __file__ `Array<FileTransportOptions>` - Winston file transport options for logging in files.
* __rotate__ `Array<DailyRotateFileTransportOptions>` - Winston daily rotate file transport options for logging in file with rotational logics.
* __console__ `Array<ConsoleTransportOptions>` - Winston console transport options for logging in console.
* __http__ `Array<HttpTransportOptions>` - Winston http transport options for logging via HTTP.
* __stream__ `Array<StreamTransportOptions>` - Winston stream transport options for logging via stream.

### HandyLoggerBase

This can be used to set type of the logger when we are calling `getLogger()`. The type actually refers to `winston.logger`, so you should be able to access all methods that `winston.logger` provides.

***

## How to use

```javascript
import { HandyLogger, HandyLoggerBase, LogLevels } from 'handy-logger';

const loggerObj: HandyLogger = new HandyLogger({
  title: 'My Awesome App',
  level: LogLevels.Info,
  transports: {
    console: [
      {
        handleExceptions: false,
      },
    ],
    file: [
      {
        filename: 'app-error.log',
        level: LogLevels.Error,
      },
      {
        filename: 'app-warning.log',
        level: LogLevels.Warn,
      },
    ],
  },
  timeStampFormat: () => {
    return new Date().toUTCString();
  },
  logDataStringCustomFormat: (ts, lv, title, msg) => {
    return `APP: ${title} :: ${ts} :: [${lv}] :: ${msg}`;
  },
});
const logger: HandyLoggerBase = loggerObj.getLogger();

logger.info('sunny day');
logger.warn('foo bar');
logger.error('err message');
```

This will log

```sh
APP: My Awesome App :: Wed, 05 Feb 2020 15:38:08 GMT :: [info] :: 	sunny day
APP: My Awesome App :: Wed, 05 Feb 2020 15:38:08 GMT :: [warn] :: 	foo bar
APP: My Awesome App :: Wed, 05 Feb 2020 15:38:08 GMT :: [error] :: 	err message
```

***

## Todos

* Add `colorize` option

***

## License

ISC
