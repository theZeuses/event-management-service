import { Exception } from '@common/constants';
import { UnprocessableEntityException as Base } from '@nestjs/common';

export class UnprocessableEntityException extends Base {
  constructor(
    errorCode?: (typeof Exception.UnprocessableEntityException)[keyof typeof Exception.UnprocessableEntityException],
    payload?: {
      reference?: string;
      errors?: any;
    },
  ) {
    super({
      statusCode: 422,
      errorCode: errorCode ?? 42200,
      reference: payload?.reference,
      errors: payload?.errors
        ? Array.isArray(payload.errors)
          ? payload.errors
          : [payload.errors]
        : undefined,
    });
  }
}
