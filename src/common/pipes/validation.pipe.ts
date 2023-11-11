import { Exception, IF_QUERY_VALIDATION_KEY } from '@common/constants';
import { BadRequestException } from '@common/exceptions';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate, ValidatorOptions } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(
    private options: ValidatorOptions = {
      whitelist: true,
      forbidNonWhitelisted: true,
    },
  ) {}

  async transform(value: any, { metatype }: ArgumentMetadata) {
    let isQueryValidation = false;

    if (value && value[IF_QUERY_VALIDATION_KEY]) {
      delete value[IF_QUERY_VALIDATION_KEY];
      isQueryValidation = true;
    }

    //if not proper dto provided through typing
    //then ignore validation
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);
    const errors = await validate(object, this.options);

    if (errors.length > 0) {
      throw new BadRequestException(
        isQueryValidation
          ? Exception.BadRequestException.INVALID_QUERY
          : Exception.BadRequestException.VALIDATION_FAILED,
        {
          errors,
        },
      );
    }

    return object;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
