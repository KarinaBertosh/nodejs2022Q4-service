import { ConsoleLogger } from '@nestjs/common';

export class MyLogger extends ConsoleLogger {
  error(message: any, stack?: string, context?: string) {
    console.log(message);
  }

  log(message: any, stack?: string, context?: string) {
    console.log(message);
  }

  warn(message: any, stack?: string, context?: string) {
    console.log(message);
  }

  debug(message: any, stack?: string, context?: string) {
    console.log(message);
  }

  verbose(message: any, stack?: string, context?: string) {
    console.log(message);
  }
}
