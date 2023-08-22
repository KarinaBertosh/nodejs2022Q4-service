import { ConsoleLogger, LogLevel } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any) {
    console.log(this.customMessage(message, 'error'));
  }

  log(message: any) {
    console.log(this.customMessage(message, 'log'));
  }

  warn(message: any) {
    console.log(this.customMessage(message, 'warn'));
  }

  debug(message: any) {
    console.log(this.customMessage(message, 'debug'));
  }

  verbose(message: any) {
    console.log(this.customMessage(message, 'verbose'));
  }

  private customMessage(message: string, logLevel: LogLevel) {
    return `${logLevel}: ` + message;
  }
}
