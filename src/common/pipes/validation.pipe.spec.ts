import { Exception } from '@common/constants';
import { BadRequestException } from '@common/exceptions';
import { IsString } from 'class-validator';
import { ValidationPipe } from './validation.pipe';

describe('ValidationPipe', () => {
  it('should be defined', () => {
    expect(new ValidationPipe()).toBeDefined();
  });

  describe('when no type information provided', () => {
    it('should return the inputted value', () => {
      const value = {
        dummy: 'data',
      };

      const argumentMetadata = {};

      expect(
        new ValidationPipe().transform(value, argumentMetadata as any),
      ).resolves.toBe(value);
    });
  });

  describe('when type information provided', () => {
    it('should throw BadRequestException if field(s) that are not in the schema are passed', () => {
      const value = {
        dummy: '1',
        doo: 2,
      };

      class DTO {
        @IsString()
        dummy: string;
      }

      const argumentMetadata = {
        metatype: DTO,
      };

      expect(() =>
        new ValidationPipe().transform(value, argumentMetadata as any),
      ).rejects.toThrowError(
        new BadRequestException(
          Exception.BadRequestException.VALIDATION_FAILED,
        ),
      );
    });

    it('should throw BadRequestException if validation fails', () => {
      const value = {
        dummy: 1,
      };

      class DTO {
        @IsString()
        dummy: string;
      }

      const argumentMetadata = {
        metatype: DTO,
      };

      expect(() =>
        new ValidationPipe().transform(value, argumentMetadata as any),
      ).rejects.toThrowError(
        new BadRequestException(
          Exception.BadRequestException.VALIDATION_FAILED,
        ),
      );
    });

    it('should pass if validation is successful', () => {
      const value = {
        dummy: '1',
      };

      class DTO {
        @IsString()
        dummy: string;
      }

      const argumentMetadata = {
        metatype: DTO,
      };

      expect(
        new ValidationPipe().transform(value, argumentMetadata as any),
      ).resolves.toEqual(value);
    });
  });
});
