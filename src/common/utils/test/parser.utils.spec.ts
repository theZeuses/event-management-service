import {
  buildFilters,
  buildWhere,
  makeFindManyOption,
  parseQuery,
  parseRelationFromString,
  parseSelectFromString,
  parseSortFromString,
  parseWhereFromString,
} from '../parser.utils';

describe('ParserUtils', () => {
  describe('parseSelectFromString', () => {
    it('returns undefined when no input is provided', () => {
      expect(parseSelectFromString()).toBeUndefined();
    });

    it('parses the select string correctly', () => {
      const selectString = 'field1,field2,field3';
      const expectedOutput = {
        field1: true,
        field2: true,
        field3: true,
      };

      expect(parseSelectFromString(selectString)).toEqual(expectedOutput);
    });

    it('parses a single field string correctly', () => {
      const selectString = 'field1';
      const expectedOutput = {
        field1: true,
      };

      expect(parseSelectFromString(selectString)).toEqual(expectedOutput);
    });

    it('returns undefined if input is an empty string', () => {
      const selectString = '';
      expect(parseSelectFromString(selectString)).toBeUndefined();
    });
  });

  describe('parseRelationFromString', () => {
    it('returns undefined when no input is provided', () => {
      expect(parseRelationFromString()).toBeUndefined();
    });

    it('parses the relation string correctly', () => {
      const relationString = 'relation1,relation2,relation3';
      const expectedOutput = {
        relation1: true,
        relation2: true,
        relation3: true,
      };

      expect(parseRelationFromString(relationString)).toEqual(expectedOutput);
    });

    it('parses a single relation string correctly', () => {
      const relationString = 'relation1';
      const expectedOutput = {
        relation1: true,
      };

      expect(parseRelationFromString(relationString)).toEqual(expectedOutput);
    });

    it('returns undefined if input is an empty string', () => {
      const relationString = '';
      expect(parseRelationFromString(relationString)).toBeUndefined();
    });
  });

  describe('parseSortFromString', () => {
    it('returns undefined when no input is provided', () => {
      expect(parseSortFromString()).toBeUndefined();
    });

    it('parses the sort string correctly', () => {
      const sortString = 'field1,-field2,field3';
      const expectedOutput = {
        field1: 'ASC',
        field2: 'DESC',
        field3: 'ASC',
      };

      expect(parseSortFromString(sortString)).toEqual(expectedOutput);
    });

    it('parses a single sort string correctly', () => {
      const sortString = 'field1';
      const expectedOutput = {
        field1: 'ASC',
      };

      expect(parseSortFromString(sortString)).toEqual(expectedOutput);
    });

    it('parses a descending sort string correctly', () => {
      const sortString = '-field1';
      const expectedOutput = {
        field1: 'DESC',
      };

      expect(parseSortFromString(sortString)).toEqual(expectedOutput);
    });

    it('returns undefined if input is an empty string', () => {
      const sortString = '';
      expect(parseSortFromString(sortString)).toBeUndefined();
    });
  });

  describe('parseQuery', () => {
    it('returns undefined when no input is provided', () => {
      expect(parseQuery()).toBeUndefined();
    });

    it('parses the query string correctly', () => {
      const queryString = {
        q: 'search',
        select: 'field1,field2',
        with: 'relation1,relation2',
        sort: 'field1,-field2',
        filter1: 'value1',
        filter2: 'value2',
      };

      const expectedOutput = {
        q: 'search',
        select: {
          field1: true,
          field2: true,
        },
        relation: {
          relation1: true,
          relation2: true,
        },
        sort: {
          field1: 'ASC',
          field2: 'DESC',
        },
        filter: {
          filter1: 'value1',
          filter2: 'value2',
        },
      };

      expect(parseQuery(queryString)).toEqual(expectedOutput);
    });

    it('output should not include field that are not in the query', () => {
      const queryString = {
        select: 'field1,field2',
        with: 'relation1,relation2',
        sort: 'field1,-field2,-field3',
        filter1: 'value1',
        filter2: 'value2',
      };

      const expectedOutput = {
        select: {
          field1: true,
          field2: true,
        },
        relation: {
          relation1: true,
          relation2: true,
        },
        sort: {
          field1: 'ASC',
          field2: 'DESC',
          field3: 'DESC',
        },
        filter: {
          filter1: 'value1',
          filter2: 'value2',
        },
      };

      expect(parseQuery(queryString)).toEqual(expectedOutput);
    });

    it('returns empty object if input is an empty object', () => {
      const queryString = {};
      expect(parseQuery(queryString)).toEqual({});
    });

    it('it should convert limit and page to int', () => {
      const queryString = {
        limit: '100',
        page: '100',
      };
      expect(parseQuery(queryString)).toEqual({
        limit: 100,
        page: 100,
      });
    });

    it('it should throw error if cannot covert limit or page to int', () => {
      const queryString = {
        limit: '100',
        page: 'abc',
      };
      expect(() => parseQuery(queryString)).toThrow(
        'Failed to parse the input to an integer.',
      );
    });
  });

  describe('parseWhereFromString', () => {
    it('returns the filter equal intended string as is', () => {
      const filterString = 'value1)';
      expect(parseWhereFromString(filterString)).toEqual(filterString);
    });

    it('returns an empty string for empty input', () => {
      const filterString = '';
      expect(parseWhereFromString(filterString)).toEqual(filterString);
    });

    it('returns undefined if input is undefined', () => {
      expect(parseWhereFromString(undefined as any)).toBeUndefined();
    });
  });

  describe('makeFindManyOption', () => {
    it('sets where condition with searchAbleColumns when parsedQuery.q and searchAbleColumns are provided', () => {
      const parsedQuery = {
        q: 'search query',
        filter: { exampleFilter: 'exampleValue' },
      };
      const searchAbleColumns = ['column1', 'column2'];

      const expected = {
        where: [
          { exampleFilter: 'exampleValue', column1: 'search query' },
          { exampleFilter: 'exampleValue', column2: 'search query' },
        ],
      };

      const result = makeFindManyOption(parsedQuery, searchAbleColumns);
      expect(result).toEqual(expected);
    });

    it('sets where condition without searchAbleColumns when parsedQuery.q is not provided', () => {
      const parsedQuery = {
        filter: { exampleFilter: 'exampleValue' },
      };

      const result = makeFindManyOption(parsedQuery);

      expect(result.where).toBeDefined();
      expect(typeof result.where).toBe('object');
    });

    it('sets select option when parsedQuery.select is provided', () => {
      const parsedQuery = {
        select: ['field1', 'field2'],
        filter: { exampleFilter: 'exampleValue' },
      };

      const result = makeFindManyOption(parsedQuery);

      expect(result.select).toBeDefined();
      expect(result.select).toEqual(parsedQuery.select);
    });

    it('sets relations option when parsedQuery.relation is provided', () => {
      const parsedQuery = {
        relation: ['relation1', 'relation2'],
        filter: { exampleFilter: 'exampleValue' },
      };

      const result = makeFindManyOption(parsedQuery);

      expect(result.relations).toBeDefined();
      expect(result.relations).toEqual(parsedQuery.relation);
    });

    it('sets order option when parsedQuery.sort is provided', () => {
      const parsedQuery = {
        sort: { field: 'ASC' },
        filter: { exampleFilter: 'exampleValue' },
      } as const;

      const result = makeFindManyOption(parsedQuery);

      expect(result.order).toBeDefined();
      expect(result.order).toEqual(parsedQuery.sort);
    });
  });

  describe('buildWhere', () => {
    it('should build an array of objects based on the provided searchAbleColumns and parsedQuery.q', () => {
      const searchAbleColumns = ['column1', 'column2'];
      const parsedQuery = { q: 'search_query' };
      const result = buildWhere(parsedQuery, searchAbleColumns);
      expect(result).toEqual([
        { column1: 'search_query' },
        { column2: 'search_query' },
      ]);
    });

    it('should return an empty array if parsedQuery.q is not defined', () => {
      const searchAbleColumns = ['column1', 'column2'];
      const parsedQuery = {};
      const result = buildWhere(parsedQuery, searchAbleColumns);
      expect(result).toEqual([]);
    });
  });

  describe('buildFilters', () => {
    it('should build a filters object based on the provided parsedQuery.filter', () => {
      const parsedQuery = { filter: { key1: 'value1', key2: 'value2' } };
      const result = buildFilters(parsedQuery);
      expect(result).toEqual({ key1: 'value1', key2: 'value2' });
    });

    it('should return an empty object if parsedQuery.filter is not defined', () => {
      const parsedQuery = {};
      const result = buildFilters(parsedQuery);
      expect(result).toEqual({});
    });
  });
});
