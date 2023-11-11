import {
  camelCaseObject,
  flattenArrayOfObjectToObject,
  isEmptyObject,
  reverseObject,
  reverseObjectTypeSafe,
} from '../object.utils';

describe('ObjectUtils', () => {
  describe('camelCaseObject', () => {
    const expectedErrorMessage = 'Provided value is not an object.';

    describe('when a value other than of object type is passed', () => {
      it('should throw error if value is string', () => {
        const value = 'test';

        expect(() => camelCaseObject(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is array', () => {
        const value = [''];

        expect(() => camelCaseObject(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is function', () => {
        const value = () => {};

        expect(() => camelCaseObject(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is boolean', () => {
        const value = true;

        expect(() => camelCaseObject(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is undefined', () => {
        const value = undefined;

        expect(() => camelCaseObject(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });

      it('should throw error if value is null', () => {
        const value = null;

        expect(() => camelCaseObject(value as any)).toThrowError(
          expectedErrorMessage,
        );
      });
    });

    describe('when an object value is passed', () => {
      it('returns empty object for empty object input', () => {
        const inputObject = {};

        const expectedOutput = {};

        expect(camelCaseObject(inputObject)).toEqual(expectedOutput);
      });

      it('should return a new object with camelCaseKey', () => {
        const object = {
          BRANCH1: 'value',
          bRANCH2: true,
          branch3: [
            {
              Branch4: [
                {
                  bRanch5: 4,
                },
              ],
              brancH6: {
                BRANCH_7: 'ok',
              },
            },
          ],
        };

        const resultObject = camelCaseObject(object);

        expect(resultObject).toEqual({
          branch1: 'value',
          bRanch2: true,
          branch3: [
            {
              branch4: [
                {
                  bRanch5: 4,
                },
              ],
              brancH6: {
                branch7: 'ok',
              },
            },
          ],
        });
      });
    });
  });

  describe('reverseObjectTypeSafe', () => {
    it('reverses keys and values of the object', () => {
      const inputObject = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };

      const expectedOutput = {
        value1: 'key1',
        value2: 'key2',
        value3: 'key3',
      };

      expect(reverseObjectTypeSafe(inputObject)).toEqual(expectedOutput);
    });

    it('returns empty object for empty object input', () => {
      const inputObject = {};

      const expectedOutput = {};

      expect(reverseObjectTypeSafe(inputObject)).toEqual(expectedOutput);
    });
  });

  describe('reverseObject', () => {
    it('reverses keys and values of the object', () => {
      const inputObject = {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      };

      const expectedOutput = {
        value1: 'key1',
        value2: 'key2',
        value3: 'key3',
      };

      expect(reverseObject(inputObject)).toEqual(expectedOutput);
    });

    it('returns empty object for empty object input', () => {
      const inputObject = {};

      const expectedOutput = {};

      expect(reverseObject(inputObject)).toEqual(expectedOutput);
    });
  });

  describe('isEmptyObject', () => {
    it('returns true for an empty object', () => {
      const input = {};
      expect(isEmptyObject(input)).toBe(true);
    });

    it('returns false for a non-empty object', () => {
      const input = { key: 'value' };
      expect(isEmptyObject(input)).toBe(false);
    });

    it('returns false for null', () => {
      const input = null;
      expect(isEmptyObject(input)).toBe(false);
    });

    it('returns false for undefined', () => {
      const input = undefined;
      expect(isEmptyObject(input)).toBe(false);
    });

    it('returns false for a string input', () => {
      const input = 'string';
      expect(isEmptyObject(input)).toBe(false);
    });

    it('returns false for a number input', () => {
      const input = 123;
      expect(isEmptyObject(input)).toBe(false);
    });

    it('returns false for an array input', () => {
      const input = [1, 2, 3];
      expect(isEmptyObject(input)).toBe(false);
    });
  });

  describe('flattenArrayOfObjectToObject', () => {
    it('should flatten an array of objects to a single object', () => {
      const arr = [{ a: 1 }, { b: 2 }, { c: 3 }];
      const result = flattenArrayOfObjectToObject(arr);
      expect(result).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should handle an empty array', () => {
      const arr: any = [];
      const result = flattenArrayOfObjectToObject(arr);
      expect(result).toEqual({});
    });

    it('should handle an array with objects having duplicate keys', () => {
      const arr = [{ a: 1 }, { a: 2 }, { a: 3 }];
      const result = flattenArrayOfObjectToObject(arr);
      expect(result).toEqual({ a: 3 });
    });
  });
});
