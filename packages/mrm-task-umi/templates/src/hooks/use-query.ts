import { useState } from 'react';
import queryString from 'query-string';
import type { ParseOptions } from 'query-string';

export const useQuery = <T = unknown>(options?: ParseOptions): T => {
  const [query] = useState<T>(() => {
    return queryString.parse(window.location.search, options) as T;
  });

  return query;
};
