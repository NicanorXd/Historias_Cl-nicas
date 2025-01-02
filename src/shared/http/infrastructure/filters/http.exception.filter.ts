import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { I18nContext } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = i18n
      ? i18n.t(exception.message || 'Error')
      : exception.message;

    const errResponse: any = exception?.getResponse() || {};
    const errors = errResponse.message;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      errors,
      path: request.url,
    });
  }
}
