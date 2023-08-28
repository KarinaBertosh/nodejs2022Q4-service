import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { MyLogger } from 'src/logger/LoggerService';
import { getErrorData, getMessage } from 'src/logger/message';

interface ExceptionResponse {
  statusCode: number;
  error: string;
  stack?: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private myLogger: MyLogger;

  constructor() {
    this.myLogger = new MyLogger();
  }

  catch = async (exception: unknown, host: ArgumentsHost): Promise<any> => {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const { path, query, body, method } = req;

    let status: HttpStatus;
    let errCtx: string;

    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse() as ExceptionResponse;
      status = exception.getStatus();
      errCtx = errorResponse.error || exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errCtx = 'Internal erver error';
    }

    const respErr = await getErrorData(status, errCtx, req);
    const ctxLog = getMessage({ path, query, body, method, status });

    this.myLogger.error(ctxLog);
    resp.status(status).json(respErr);
  };
}
