import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AppRequestLoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly clsService: ClsService,
    private readonly logger: Logger,
  ) {}

  private isValidForLog(request: Request): boolean {
    return !(request.method === 'OPTIONS');
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl: url, body: requestBody } = request;

    const isValid = this.isValidForLog(request);
    if (!isValid) {
      return next();
    }

    const userAgent = request.get('user-agent') || '';

    const apiUrl = `${method} ${url}`;

    request.startTime = new Date();

    response.on('close', () => {
      const { statusCode: responseStatus } = response;
      this.logger.log(
        JSON.stringify({
          ip,
          userAgent,
          id: this.clsService.getId(),
          api: apiUrl,
          responseStatus,
          contentLength: response.get('content-length'),
          requestBody: isEmpty(requestBody) ? undefined : requestBody,
          date: request.startTime,
          ms: new Date().getTime() - request.startTime!.getTime(),
        }),
      );
    });

    next();
  }
}
