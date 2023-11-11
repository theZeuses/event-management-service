import { ParsedQueryType, QueryType } from '@common/types';
import { FindManyOptions } from 'typeorm';
import { parseIntOrFail, parseIntOrFallback } from './number.utils';
import { flattenArrayOfObjectToObject, isEmptyObject } from './object.utils';
import { IPaginationMeta, IPaginationOptions } from 'nestjs-typeorm-paginate';

export function parseSelectFromString(select?: string) {
  let parsedSelect:
    | {
        [index: string]: boolean;
      }
    | undefined = undefined;

  if (select) {
    parsedSelect = {};

    select.split(',').map((s) => {
      parsedSelect![s] = true;
    });
  }

  return parsedSelect;
}

export function parseRelationFromString(relation?: string) {
  let parsedRelation:
    | {
        [index: string]: boolean;
      }
    | undefined = undefined;

  if (relation) {
    parsedRelation = {};

    relation.split(',').map((s) => {
      parsedRelation![s] = true;
    });
  }

  return parsedRelation;
}

export function parseSortFromString(sort?: string) {
  let parsedSort:
    | {
        [index: string]: 'ASC' | 'DESC';
      }
    | undefined = undefined;

  if (sort) {
    parsedSort = {};

    sort.split(',').map((s) => {
      parsedSort![s.startsWith('-') ? s.slice(1) : s] = s.startsWith('-')
        ? 'DESC'
        : 'ASC';
    });
  }

  return parsedSort;
}

/**
 * Takes a express request query and converts it to a parsed query than can be validated
 */
export function parseQuery(query?: QueryType) {
  if (!query) return undefined;
  if (isEmptyObject(query)) return {};

  const { q, select, with: relation, sort, limit, page, ...filter } = query;

  const parsed = {
    q,
    select: parseSelectFromString(select),
    relation: parseRelationFromString(relation),
    sort: parseSortFromString(sort),
    limit: limit ? parseIntOrFail(limit) : undefined,
    page: page ? parseIntOrFail(page) : undefined,
    filter: !isEmptyObject(filter) ? filter : undefined,
  } as const;

  Object.keys(parsed).forEach(
    ((key: keyof typeof parsed) =>
      parsed[key] === undefined && delete parsed[key]) as any,
  );

  return parsed;
}

//TODO: Add more filtering condition option
export function parseWhereFromString(filterString: string) {
  return filterString;
}

/**
 * Takes a parsed query and converts it to a findManyOption for typeorm
 */
//TODO:Refactor this along the way
export function makeFindManyOption(
  parsedQuery: ParsedQueryType,
  searchAbleColumns: string[] = [],
) {
  const findManyOption: FindManyOptions = {};

  if (parsedQuery.filter || (parsedQuery.q && searchAbleColumns.length > 0)) {
    findManyOption.where = buildWhere(parsedQuery, searchAbleColumns).map(
      (filter) => ({
        ...filter,
        ...buildFilters(parsedQuery),
      }),
    );
  }

  if (parsedQuery.select) {
    findManyOption.select = parsedQuery.select;
  }

  if (parsedQuery.relation) {
    findManyOption.relations = parsedQuery.relation;
  }

  if (parsedQuery.sort) {
    findManyOption.order = parsedQuery.sort;
  }

  return findManyOption;
}

export function buildWhere(
  parsedQuery: ParsedQueryType,
  searchAbleColumns: string[],
) {
  if (!parsedQuery.q) return [];
  return searchAbleColumns.map((col) => ({ [col]: parsedQuery.q }));
}

export function buildFilters(parsedQuery: ParsedQueryType) {
  if (!parsedQuery.filter) return {};
  return flattenArrayOfObjectToObject(
    Object.keys(parsedQuery.filter)
      .map((f) => {
        if (!parsedQuery.filter || !parsedQuery.filter[f]) return undefined;
        return { [f]: parseWhereFromString(parsedQuery.filter[f] as any) };
      })
      .filter((f) => f != undefined) as Record<string, any>[],
  );
}

export function makePaginationOption(
  parsedQuery: {
    limit?: number | string;
    page?: number | string;
  },
  defaultLimit = 0,
): IPaginationOptions {
  return {
    limit: parseIntOrFallback(parsedQuery.limit, defaultLimit),
    page: parseIntOrFallback(parsedQuery.page, 1),
    metaTransformer: (meta: IPaginationMeta) =>
      ({
        total: meta.totalItems,
        per_page: meta.itemsPerPage,
        total_pages: meta.totalPages,
        current_page: meta.currentPage,
      } as unknown as IPaginationMeta),
  };
}
