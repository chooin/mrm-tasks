import { history } from 'umi';
import type { ParseOptions, StringifyOptions } from 'query-string';
import { parseQuery } from '@/utils';
import { useState } from 'react';

export const useQuery = <T = unknown>(
  options?: StringifyOptions & ParseOptions,
): T => {
  const [query] = useState<T>(
    parseQuery<T>(history.location.query ?? {}, options),
  );

  return query;
};
