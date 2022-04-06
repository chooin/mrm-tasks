import queryString, { StringifyOptions, ParseOptions } from 'query-string';

type Options = StringifyOptions &
  ParseOptions & {
    trim?: boolean;
  };

type Query = Record<string, string | string[] | null>;

export function parseQuery<T extends {}>(query: Query, options: Options): T;

export function parseQuery(query: Query, options: Options) {
  if (options.trim) {
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === 'string') {
        query[key] = value.trim();
      } else if (Array.isArray(value)) {
        query[key] = value.map((v) => v.trim());
      }
    });
  }

  return queryString.parse(queryString.stringify(query, options), options);
}
