import { Exception } from '@common/constants';
import { ForbiddenException as Base } from '@nestjs/common';

export class ForbiddenException extends Base {
  constructor(
    errorCode?: (typeof Exception.ForbiddenException)[keyof typeof Exception.ForbiddenException],
    payload?: {
      reference?: string;
      errors?: any;
    },
  ) {
    super({
      statusCode: 403,
      errorCode: errorCode ?? 40300,
      reference: payload?.reference,
      errors: payload?.errors
        ? Array.isArray(payload.errors)
          ? payload.errors
          : [payload.errors]
        : undefined,
    });
  }
}
