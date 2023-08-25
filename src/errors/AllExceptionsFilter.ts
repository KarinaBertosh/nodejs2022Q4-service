import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { MyLogger } from 'src/logger/LoggerService';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly myLogger: MyLogger,) { }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { method, url, query, body } = request;
    this.myLogger.setContext(url);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      const message = exception.message;

      const responseBody = {
        statusCode: httpStatus,
        message,
        timestamp: new Date().toISOString(),
        path: url,
      };

      this.myLogger.log(
        `Method: "${method}",
        URL: "${url}",
        Query: ${JSON.stringify(query, null, 1)},
        Status-code: ${httpStatus},
        Requests-body: ${JSON.stringify(body, null, 1)},
        Error: ${JSON.stringify(responseBody, null, 1)}`,
      );

      httpAdapter.reply(ctx.getResponse<Response>(), responseBody, httpStatus);
    }

    const responseBody = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    };

    this.myLogger.log(
      `Method: "${method}",
      URL: "${url}",
      Query: ${JSON.stringify(query, null, 1)},
      Status-code: ${httpStatus},
      Requests-body: ${JSON.stringify(body, null, 1)},
      Error: ${JSON.stringify(responseBody, null, 1)}`,
    );

    httpAdapter.reply(
      ctx.getResponse<Response>(),
      responseBody,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
