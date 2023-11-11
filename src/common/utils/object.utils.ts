import { camelCase } from 'lodash';

/**
 * Takes any object and returns a new object with all keys in camel case
 */
export function camelCaseObject<T extends Record<string, any>>(
  object: T,
): KeysToCamelCase<T> {
  if (!object || Array.isArray(object) || typeof object != 'object') {
    throw new Error('Provided value is not an object.');
  }

  return walker(object) as KeysToCamelCase<T>;

  function walker<T extends Record<string, any>>(
    obj: T | T[],
  ): KeysToCamelCase<T> | KeysToCamelCase<T>[] {
    if (Array.isArray(obj)) {
      return obj.map(walker) as any;
    }

    if (typeof obj === 'object') {
      const entries = Object.entries(obj);
      return Object.fromEntries(entries.map(transformEntry));
    }

    return obj;
  }

  function transformEntry([k, v]: Array<any>) {
    return [camelCase(k), typeof v === 'object' ? walker(v) : v];
  }
}

export function reverseObjectTypeSafe<
  Type extends Record<string, any>,
  Mapper extends Record<keyof Type, string>,
>(mapper: {
  [P in keyof Type]: string;
}): InvertObject<Mapper> {
  return Object.fromEntries(
    Object.entries(mapper).map(([key, value]: [string, any]) => {
      return [value, key];
    }),
  );
}

export function reverseObject<T extends Record<PropertyKey, any>>(mapper: {
  [P in keyof T]: string;
}): InvertObject<T> {
  return reverseObjectTypeSafe(mapper);
}

export function isEmptyObject(input: any) {
  return (
    (input && typeof input == 'object' && Object.keys(input).length == 0) ===
    true
  );
}

export function flattenArrayOfObjectToObject(arr: Array<Record<string, any>>) {
  return arr.reduce((result, current) => {
    for (const key in current) {
      if (Object.prototype.hasOwnProperty.call(current, key)) {
        result[key] = current[key];
      }
    }
    return result;
  }, {});
}
