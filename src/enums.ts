export enum LogLevels {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Http = 'http',
  Verbose = 'verbose',
  Debug = 'debug',
  Silly = 'silly',
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
  File = 'file',
  Console = 'console',
  Http = 'http',
  Stream = 'stream',
  Rotate = 'rotate',
}
