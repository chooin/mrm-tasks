import { useState } from 'react';
import { history } from 'umi';
import type { ParseOptions, StringifyOptions } from 'query-string';
import { parseQuery } from '@/utils';

type Options = StringifyOptions &
  ParseOptions & {
    defaultValue?: Record<string, any>;
  };

export const useQuery = <T = unknown>(options?: Options): T => {
  const [query] = useState<T>(
    Object.assign(
      options?.defaultValue ?? {},
      parseQuery<T>(history.location.query ?? {}, options),
    ),
  );

  return query;
};
