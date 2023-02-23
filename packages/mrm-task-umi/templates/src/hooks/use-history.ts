import { history } from 'umi';
import querystring from 'query-string';

type Location = { pathname: string; query: Record<string, any> };

interface Result {
  action: 'POP' | 'PUSH' | 'REPLACE';
  push(path: string): void;
  push(location: Location): void;
  replace(path: string): void;
  replace(location: Location): void;
  go(delta: number): void;
  forward(): void;
  back(): void;
}

export function useHistory(): Result {
  const stringifyUrl = (location: Location) => {
    if (typeof location === 'string') {
      return location;
    } else {
      return querystring.stringifyUrl({
        url: location.pathname,
        query: location.query,
      });
    }
  };

  const push = (location: Location) => {
    history.push(stringifyUrl(location));
  };

  const replace = (location: Location) => {
    history.push(stringifyUrl(location));
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
