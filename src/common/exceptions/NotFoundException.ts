import { Exception } from '@common/constants';
import { NotFoundException as Base } from '@nestjs/common';

export class NotFoundException extends Base {
  constructor(
    errorCode?: (typeof Exception.NotFoundException)[keyof typeof Exception.NotFoundException],
    payload?: {
      reference?: string;
      errors?: any;
    },
  ) {
    super({
      statusCode: 404,
      errorCode: errorCode ?? 40400,
      reference: payload?.reference,
      errors: payload?.errors
        ? Array.isArray(payload.errors)
          ? payload.errors
          : [payload.errors]
        : undefined,
    });
  }
}
