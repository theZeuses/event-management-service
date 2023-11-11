import { Exception, IF_QUERY_VALIDATION_KEY } from '@common/constants';
import { BadRequestException } from '@common/exceptions';
import { parseQuery } from '@common/utils';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParsedQuery = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    try {
      return {
        [IF_QUERY_VALIDATION_KEY]: true,
        ...parseQuery(request.query),
      };
    } catch (err) {
      throw new BadRequestException(
        Exception.BadRequestException.INVALID_QUERY,
      );
    }
  },
);
