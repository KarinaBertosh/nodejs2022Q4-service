import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';
import { MyLogger } from 'src/logger/LoggerService';
import { StatusCodes } from 'http-status-codes';

function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

@Injectable()
export class Interceptor implements NestInterceptor {
  constructor(@Inject(MyLogger) private readonly logger: MyLogger) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const { method, url, body, query } = ctx.getRequest<Request>();
    const { statusCode } = ctx.getResponse<Response>();

    const currentContext = context.getClass().name || '';
    const queryObj = !isEmpty(query) ? `query ${JSON.stringify(query)} ` : '';
    const bodyObj = !isEmpty(body) ? `body ${JSON.stringify(body)} ` : '';
    const message = `${method} route {${url}} ${queryObj}${bodyObj}${statusCode}`;

    if (statusCode === StatusCodes.INTERNAL_SERVER_ERROR) {
      this.logger.error(`message: ${message}, context: ${currentContext}`);

      return next
        .handle()
        .pipe(
          tap(() =>
            this.logger.error(
              `message: ${message}, context: ${currentContext}`)));
    }

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(`message: ${message}, context: ${currentContext}`)));
  }
}
