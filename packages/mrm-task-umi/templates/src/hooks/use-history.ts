import { history } from 'umi';
import querystring from 'query-string';

type Location = { pathname: string; query: Record<string, any> };

interface Result {
  action: 'POP' | 'PUSH' | 'REPLACE';
  push(path: string): void;
  push(location: Location): void;
  replace(path: string): void;
  replace(options: Location): void;
  go(delta: number): void;
  forward(): void;
  back(): void;
}

export function useHistory(): Result {
  const stringifyUrl = (location: string | Location) => {
    if (typeof location === 'string') {
      return location;
    } else {
      return querystring.stringifyUrl({
        url: location.pathname,
        query: location.query,
      });
    }
  };

  const push = (options: string | Location) => {
    history.push(stringifyUrl(options));
  };

  const replace = (options: string | Location) => {
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
