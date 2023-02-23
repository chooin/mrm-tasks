import { history } from 'umi';
import querystring from 'query-string';

type Options = string | { pathname: string; query: Record<string, any> };

interface Result {
  action: 'POP' | 'PUSH' | 'REPLACE';
  push: (options: Options) => void;
  replace: (options: Options) => void;
  go: (delta: number) => void;
  forward: () => void;
  back: () => void;
}

export function useHistory(): Result {
  const stringifyUrl = (options: Options) => {
    if (typeof options === 'string') {
      return options;
    } else {
      return querystring.stringifyUrl({
        url: options.pathname,
        query: options.query,
      });
    }
  };

  const push = (options: Options) => {
    history.push(stringifyUrl(options));
  };

  const replace = (options: Options) => {
    history.push(stringifyUrl(options));
  };

  return {
    action: history.action,
    push,
    replace,
    go: history.go,
    forward: history.forward,
    back: history.back,
  };
}
