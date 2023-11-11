import { Exception } from '@common/constants';
import { BadRequestException as Base } from '@nestjs/common';

export class BadRequestException extends Base {
  constructor(
    errorCode?: (typeof Exception.BadRequestException)[keyof typeof Exception.BadRequestException],
    payload?: {
      reference?: string;
      errors?: any;
    },
  ) {
    super({
      statusCode: 400,
      errorCode: errorCode ?? 40000,
      reference: payload?.reference,
      errors: payload?.errors
        ? Array.isArray(payload.errors)
          ? payload.errors
          : [payload.errors]
        : undefined,
    });
  }
}
