import type { ParseOptions } from 'query-string';
import queryString from 'query-string';

export function useSearchParams<T = unknown>(options?: ParseOptions): T;
export function useSearchParams(options: any) {
  return queryString.parse(window.location.search, options);
}
