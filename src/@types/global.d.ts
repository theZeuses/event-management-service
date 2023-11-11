declare global {
  //Here, declare things that go in the global namespace, or augment
  //existing declarations in the global namespace
  type valueof<T> = T[keyof T];
  type StringValueOf<T> = T[keyof T] & string;
  type Newable<T> = new (...args: any[]) => T;
  type PartialK<T, K extends keyof T> = Partial<Pick<T, K>> & Omit<T, K>;
  type UncapitalizeObjectKeys<T> = {
    [key in keyof T as Uncapitalize<key & string>]: T[key] extends Object
      ? UncapitalizeObjectKeys<T[key]>
      : T[key];
  };

  type CamelCase<S extends string> =
    S extends `${infer P1}_${infer P2}${infer P3}`
      ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
      : Lowercase<S>;

  type ObjectToCamel<T> = {
    [K in keyof T as CamelCase<string & K>]: T[K] extends Record<string, any>
      ? KeysToCamelCase<T[K]>
      : T[K];
  };

  type KeysToCamelCase<T> = {
    [K in keyof T as CamelCase<string & K>]: T[K] extends Array<any>
      ? KeysToCamelCase<T[K][number]>[]
      : ObjectToCamel<T[K]>;
  };

  type AliasedKey<Type, Mapper extends Record<keyof Type, string>> = {
    [K in keyof Type as K extends keyof Mapper ? Mapper[K] : K]: Type[K];
  };

  type InvertObject<T extends Record<string, any>> = {
    [K in keyof T as T[K]]: string;
  };

  declare namespace Express {
    export interface Request {
      headers: {
        'x-request-id'?: string;
      };
      startTime?: Date;
    }
  }
}

export {};
