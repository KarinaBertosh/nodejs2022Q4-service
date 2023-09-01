export const LOGGER_MAX_SIZE = +process.env.FILE_MAX_SIZE || 1;

export const LOGGER_DIRECTORY = 'logs';

export const LOGGER_LEVEL = +process.env.LEVEL || 2;

export enum LOGGER_VARIABLES {
  log = 'log',
  error = 'error',
  warn = 'warn',
  debug = 'debug',
  verbose = 'verbose',
}

export enum LOGGER_FILES {
  log = 'log',
  error = 'error',
}
