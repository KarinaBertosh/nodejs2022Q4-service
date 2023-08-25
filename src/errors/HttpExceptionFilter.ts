import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ResponseData = {
  statusCode: HttpStatus;
  error: string | string[] | unknown;
  timestamp: string;
  path: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    const data: ResponseData = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Unknown error',
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (exception instanceof HttpException) {
      data.statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        'message' in exceptionResponse
      ) {
        data.error = exceptionResponse['message'] || exception.message;
      } else {
        data.error = exception.message;
      }
    }

    response.status(data.statusCode).json(data);
  }
}
