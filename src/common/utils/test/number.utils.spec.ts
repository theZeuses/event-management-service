import { parseIntOrFail, parseIntOrFallback } from '../number.utils';

describe('NumberUtils', () => {
  describe('parseIntOrFail', () => {
    it('parses the string input to an integer', () => {
      expect(parseIntOrFail('123')).toBe(123);
    });

    it('throws an error if the input is not a parseable integer', () => {
      expect(() => {
        parseIntOrFail('abc');
      }).toThrowError('Failed to parse the input to an integer.');
    });

    it('throws an error if the input is undefined', () => {
      expect(() => {
        parseIntOrFail(undefined);
      }).toThrowError('Failed to parse the input to an integer.');
    });

    it('parses the numeric input to an integer', () => {
      expect(parseIntOrFail(456)).toBe(456);
    });

    it('parses the float input to an integer', () => {
      expect(parseIntOrFail(456.78)).toBe(456);
    });
  });

  describe('parseIntOrFallback', () => {
    it('parses the string input to an integer', () => {
      expect(parseIntOrFallback('123', 0)).toBe(123);
    });

    it('returns the fallback value if the input is not a parseable integer', () => {
      expect(parseIntOrFallback('abc', 0)).toBe(0);
    });

    it('returns the fallback value if the input is undefined', () => {
      expect(parseIntOrFallback(undefined, 0)).toBe(0);
    });

    it('parses the numeric input to an integer', () => {
      expect(parseIntOrFallback(456, 0)).toBe(456);
    });

    it('parses the string input to an integer using the fallback value if not parseable', () => {
      expect(parseIntOrFallback('abc', 999)).toBe(999);
    });
  });
});
