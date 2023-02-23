import type { ParseOptions } from 'query-string';
import queryString from 'query-string';

export function parseQuery<T = unknown>(
  query: string,
  options?: ParseOptions,
): T;

export function parseQuery(query: string, options: ParseOptions = {}) {
  return queryString.parse(query, options);
}
