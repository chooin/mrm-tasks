import { history } from '@umijs/max';
import querystring from 'query-string';
import { match, P } from 'ts-pattern';

type Location = { pathname: string; query: Record<string, any> };

interface Result {
  action: 'POP' | 'PUSH' | 'REPLACE';
  push(path: string): void;
  push(options: Location): void;
  replace(path: string): void;
  replace(options: Location): void;
  go(delta: number): void;
  forward(): void;
  back(): void;
}

export function useHistory(): Result {
  const stringifyUrl = (options: string | Location): string => {
    return match(options)
      .with(P.string, (r) => {
        return r;
      })
      .with(
        {
          pathname: P.string,
          query: P.any,
        },
        (r) => {
          return querystring.stringifyUrl({
            url: r.pathname,
            query: r.query,
          });
        },
      )
      .run();
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
