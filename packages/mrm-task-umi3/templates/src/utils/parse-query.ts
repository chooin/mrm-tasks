import type { StringifyOptions, ParseOptions } from 'query-string';
import queryString from 'query-string';

type Options = StringifyOptions &
  ParseOptions & {
    trimStrings?: boolean;
  };

type Query = Record<string, string | number | (string | number)[] | null>;

export function parseQuery<T extends {}>(query: Query, options: Options): T;

export function parseQuery(query: Query, options: Options) {
  if (options.trimStrings) {
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === 'string') {
        query[key] = value.trim();
      } else if (Array.isArray(value)) {
        query[key] = value.map((v) => {
          if (typeof v === 'string') {
            return v.trim();
          }
          return v;
        });
      }
    });
  }

  return queryString.parse(queryString.stringify(query, options), options);
}
