import { ConsoleLogger, LogLevel } from '@nestjs/common';
import {
  LOGGER_FILES,
  LOGGER_LEVEL,
  LOGGER_MAX_SIZE,
  LOGGER_VARIABLES,
} from './constants';
import { join } from 'path';
import { promises as fsPromises, mkdirSync } from 'fs';

export class MyLogger extends ConsoleLogger {
  logFile: number;
  errorFile: number;

  constructor(
    private fileMaxSize = LOGGER_MAX_SIZE * 1024,
    private levels = Object.keys(LOGGER_VARIABLES).slice(
      0,
      LOGGER_LEVEL,
    ) as Array<LogLevel>,
    private logDirectory = join(__dirname, '..', '..', 'logs'),
  ) {
    super(MyLogger.name, {
      logLevels: Object.keys(LOGGER_VARIABLES).slice(
        0,
        LOGGER_LEVEL,
      ) as Array<LogLevel>,
    });

    this.logFile = 1;
    this.errorFile = 1;
    this.checkFiles();
  }

  getLogPath = (): string => {
    return join(this.logDirectory, `${LOGGER_FILES.log}-${this.logFile}.log`);
  };

  getErrorPath = (): string => {
    return join(
      this.logDirectory,
      `${LOGGER_FILES.error}-${this.errorFile}.log`,
    );
  };

  isFile = async (path: string) => {
    try {
      await fsPromises.stat(path);
      return true;
    } catch (error) {
      return false;
    }
  };

  createFileLog = async (filePath: string): Promise<void> => {
    const existFile = this.isFile(filePath);

    if (existFile) return;
    try {
      await fsPromises.writeFile(filePath, '', { encoding: 'utf8', flag: 'w' });
    } catch (error) {
      throw new Error('Error creating file');
    }
  };

  getDir = (): void => {
    if (!this.isFile(this.logDirectory)) {
      try {
        mkdirSync(this.logDirectory, { recursive: true });
      } catch (error) {
        throw new Error('Error creating directory');
      }
    }
  };

  isNumberFile = async (path = LOGGER_FILES.log) => {
    const filePath =
      path === LOGGER_FILES.log ? this.getLogPath() : this.getErrorPath();

    try {
      const isfileExist = this.isFile(filePath);
      if (!isfileExist) {
        await this.createFileLog(filePath);
        return;
      }

      const file = await fsPromises.stat(filePath);
      if (file.size >= this.fileMaxSize) {
        if (path === LOGGER_FILES.log) {
          this.logFile++;
        } else {
          this.errorFile++;
        }
        await this.isNumberFile(path);
      }
    } catch (err) {
      return null;
    }
  };

  checkFiles = () => {
    this.getDir();
    this.isNumberFile(LOGGER_FILES.log);
    this.isNumberFile(LOGGER_FILES.error);
  };

  checkSize = async (path: LOGGER_FILES) => {
    const filePath =
      path === LOGGER_FILES.log ? this.getLogPath() : this.getErrorPath();
    const fileType = path === LOGGER_FILES.log ? 'fileLog' : 'fileError';

    try {
      const stat = await fsPromises.stat(filePath);
      if (stat.size >= this.fileMaxSize) {
        this[fileType]++;
        await this.createFileLog(filePath);
      }
    } catch (err) {
      return null;
    }
  };

  writeCtxToFile = async (ctx: string, path = LOGGER_FILES.log) => {
    try {
      const filePath =
        path === LOGGER_FILES.log ? this.getLogPath() : this.getErrorPath();
      if (this.checkSize(path)) {
        await this.createFileLog(filePath);
      }
      await fsPromises.appendFile(filePath, ctx, 'utf8');
    } catch (err) {
      console.log('Failed to write to file', err);
      this.checkFiles();
    }
  };

  checkLevels = () => {
    if (!this.levels.includes(LOGGER_VARIABLES.log)) return;
  };

  getMessage(ctx: any, restParams: any[], error?: any) {
    this.checkLevels();
    this.writeCtxToFile(ctx, error);
    super.log(ctx, restParams);
  }

  log = (ctx: any, ...restParams: any[]) => {
    this.getMessage(ctx, restParams);
  };

  error = (ctx: any, ...restParams: any[]) => {
    this.getMessage(ctx, restParams, LOGGER_FILES.error);
  };

  warn = (ctx: any, ...restParams: any[]) => {
    this.getMessage(ctx, restParams);
  };

  debug = (ctx: any, ...restParams: any[]) => {
    this.getMessage(ctx, restParams);
  };

  verbose = (ctx: any, ...restParams: any[]) => {
    this.getMessage(ctx, restParams);
  };
}
