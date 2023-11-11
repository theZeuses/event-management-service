export const Exception = {
  BadRequestException: {
    UNKNOWN: 40000,
    VALIDATION_FAILED: 40001,
    INVALID_QUERY: 40002,
  },
  ForbiddenException: {
    UNKNOWN: 40300,
    ALREADY_EXISTS: 40301,
    NOT_FOUND: 40302,
    IDENTIFIER_NOT_FOUND: 40303,
    INVALID_PHONE_NUMBER: 40304,
  },
  InternalServerErrorException: {
    UNKNOWN: 50000,
  },
  NotFoundException: {
    UNKNOWN: 40400,
    ENTITY_NOT_FOUND: 40401,
  },
  UnauthorizedException: {
    UNKNOWN: 40100,
    INVALID_CREDENTIALS: 40101,
    INCORRECT_CREDENTIALS: 40102,
  },
  UnprocessableEntityException: {
    UNKNOWN: 42200,
    UNIQUE_VALIDATION_FAILED: 42201,
  },
} as const;
