import { useLocation } from 'umi';
import type { ParseOptions, StringifyOptions } from 'query-string';
import { parseQuery } from '@/utils';
import { useState } from 'react';

export const useQuery = <T = unknown>(
  options?: StringifyOptions & ParseOptions,
): T => {
  const location = useLocation();

  const [query] = useState<T>(parseQuery<T>(location.search, options));

  return query;
};
