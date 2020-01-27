export enum LogLevels {
  error = 'error',
  warn = 'warn',
  info = 'info',
  http = 'http',
  verbose = 'verbose',
  debug = 'debug',
  silly = 'silly',
}

export enum LogFormats {
  align,
  cli,
  combine,
  errors,
  json,
  label,
  logstash,
  metadata,
  ms,
  simple,
  splat,
}

export enum TransportTypes {
  file = 'file',
  console = 'console',
  http = 'http',
  stream = 'stream',
  dailyRotateFile = 'daily-rotate-file',
}
