import type { StringifyOptions, ParseOptions } from 'query-string';
import queryString from 'query-string';

type Options = StringifyOptions & ParseOptions;

type Query = Partial<Record<string, string>>;

export function parseQuery<T = {}>(query: Query, options?: Options): T;

export function parseQuery(query: Query, options: Options = {}) {
  return queryString.parse(queryString.stringify(query, options), options);
}
