export interface TransformConfig {
  filename?: string,
  datePattern?: string,
  zippedArchive?: boolean,
  maxSize?: string,
  maxFiles?: string,
};

export interface TransportOption {
  title?: string,
  level: string,
  message?: any,
};
