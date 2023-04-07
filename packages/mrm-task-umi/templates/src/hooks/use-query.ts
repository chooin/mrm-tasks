import { useLocation } from '@umijs/max';
import type { ParseOptions, StringifyOptions } from 'query-string';
import { useState } from 'react';
import queryString from 'query-string';

export const useQuery = <T = unknown>(
  options?: StringifyOptions & ParseOptions,
): T => {
  const location = useLocation();

  const [query] = useState<T>(queryString.parse(location.search, options) as T);

  return query;
};
