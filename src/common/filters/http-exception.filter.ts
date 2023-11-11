import { IExceptionData } from '@common/interfaces';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.log(exception);
    return this.convertToStandardResponse(exception, response);
  }

  private log(exception: unknown) {
    console.log(exception);
    this.logger.log(exception);
  }

  private convertToStandardResponse(exception: unknown, response: Response) {
    let errors: unknown | undefined = undefined;
    let errorCode: number | undefined;
    let reference: string | undefined;

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    //try converting exception
    //to standard response
    if (exception instanceof HttpException) {
      const exceptionResponse: IExceptionData | string =
        exception.getResponse();

      if (typeof exceptionResponse == 'string') {
        errorCode = httpStatus * 100;
      } else {
        errors = exceptionResponse.errors;
        errorCode = exceptionResponse.errorCode ?? httpStatus * 100;
        reference = exceptionResponse.reference;
      }
    }

    return response.status(httpStatus).json({
      statusCode: httpStatus,
      errorCode: errorCode ?? httpStatus * 100,
      reference,
      errors,
    });
  }
}
