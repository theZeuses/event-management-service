import { mustBeStringOrFail } from '../string.utils';

describe('StringUtils', () => {
  describe('mustBeStringOrFail', () => {
    const expectedErrorMessage = 'Provided value must be a string.';

    describe('when no value is passed', () => {
      it('should throw error', () => {
        expect(() => mustBeStringOrFail()).toThrowError(expectedErrorMessage);
      });
    });

    describe('when a value other than of string type is passed', () => {
      it('should throw error if value is object', () => {
        const value = {};

        expect(() => mustBeStringOrFail(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is array', () => {
        const value = [''];

        expect(() => mustBeStringOrFail(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is function', () => {
        const value = () => {};

        expect(() => mustBeStringOrFail(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is boolean', () => {
        const value = true;

        expect(() => mustBeStringOrFail(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is undefined', () => {
        const value = undefined;

        expect(() => mustBeStringOrFail(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is null', () => {
        const value = null;

        expect(() => mustBeStringOrFail(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });
    });

    describe('when string value is passed', () => {
      it('should return the passed string', () => {
        const value = 'passed';
        const result = mustBeStringOrFail(value);

        expect(result).toBe(value);
      });
    });
  });
});
