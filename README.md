# Easy Logger

[![Build Status](https://travis-ci.org/db-s/easy-logger.svg?branch=master)](https://travis-ci.org/db-s/easy-logger)

An easy log handler for Node.js application which is built on top of popular logger library `winston`.

- Type some Markdown on the left
- See HTML in the right
- Magic

### Installation

```sh
$ npm i https://github.com/db-s/easy-logger
```

### Get started:

__Import library__

```javascript
import { easyLogger, EasyLogger, EasyLoggerBase } from 'easy-logger';
```

`easyLogger`
This is an instance of EasyLogger class with default configuration. You can directly use this instance if there isn't any need of customization. In other words, it's a shorthand of the following -

```javascript
const easyLogger = new EasyLogger();
```

`EasyLogger`
This is the wrapper class that is used when you need to create a logger instance with custom configuration.

Create logger with your configuration
```javascript
const myLogger = new EasyLogger(opts);
```
`EasyLogger` config has following properties -
* __title__ (string): Application title can be provided which will be prefixed in log messages.
* __level__ (LogLevels | string): Log level. Read more [here](https://github.com/winstonjs/winston#logging-levels).
* __levels__ (object): Custom log levels. Read more [here](https://github.com/winstonjs/winston#using-custom-logging-levels).
* __transports__ (array): List of log transports ie. `console`, `file` etc. Read more [here](https://github.com/winstonjs/winston#transports). Transport options are as follows -
  * _type_ (TransportTypes | string): Type of transport. Types are following -
    `file` - For logging in files
    `daily-rotate-file` - For logging in file with rotational logics
    `console` - For logging in console
    `http` - For logging via HTTP
    `stream` - For logging via stream
  * _fileOpts_ (FileTransportOptions): Winston file transport options
  * _consoleOpts_ (ConsoleTransportOptions): - Winston console transport options
  * _httpOpts_ (HttpTransportOptions): Winston http transport options
  * _streamOpts_ (StreamTransportOptions): Winston stream transport options
  * _rotationOpts_ (DailyRotateFileTransportOptions): Winston daily rotate file transport options (only works if `type` is set to `daily-rotate-file`)
* __overrideConfig__ (boolean): Flag to override default configuration. If set to `true`, it will override only the provided configuration in constructor, otherwiese the given config will be set replacing the default config.
* __timeStampFormat__ (string | (() => string)): Custom timestamp format. It can be a string accepted by [fetcha](https://github.com/taylorhakes/fecha) module or a method that returns formatted date.
* __logDataStringCustomFormat__ ((timestamp:string, level:string, message:string) => string): Custom log message format. You can pass a method with timestamp, level and message and return a formatted string.

`EasyLoggerBase`
This can be used to set type of the logger when we are calling `getLogger()`. The type actually refers to `winston.logger`, so you should be able to access all methods that `winston.logger` provides.


### How to use:

```javascript
const loggerObj: EasyLogger = new EasyLogger({
  title: 'ARC Facilities',
  level: 'silly',
  colorize: true,
  transports: [
    {
      type: 'console',
      consoleOpts: {},
    }
  ],
  overrideConfig: true,
  timeStampFormat: () => {
    return new Date().toUTCString();
  },
  logDataStringCustomFormat: (ts, lv, msg) => {
    return `${lv} >>>> ${ts} >>>> ${msg}`;
  },
});
const logger: EasyLoggerBase = loggerObj.getLogger();

logger.info('foo bar');
logger.warn('john doe is a good man');
```

This will log
```sh
info >>>> Mon, 27 Jan 2020 12:52:00 GMT >>>> 	foo bar
warn >>>> Mon, 27 Jan 2020 12:52:00 GMT >>>> 	john doe is a good man
```

### Todos

- Add `colorize` option

License
----

ISC
