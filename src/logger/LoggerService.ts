import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any) {
    this.customMessage(message, 'error');
  }

  log(message: any) {
    this.customMessage(message, 'log');
  }

  warn(message: any) {
    this.customMessage(message, 'warn');
  }

  debug(message: any) {
    this.customMessage(message, 'debug');
  }

  verbose(message: any) {
    this.customMessage(message, 'verbose');
  }

  private customMessage(message: string, logLevel: LogLevel) {
    console.log(`${logLevel} ➡️ : ` + message);
  }
}
