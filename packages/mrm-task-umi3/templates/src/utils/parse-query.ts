import queryString from 'query-string';

type Options = {
  skipEmptyString?: boolean;
  parseNumbers?: boolean;
  parseBooleans?: boolean;
};

type Query = Record<string, string | string[] | null>;

export function parseQuery<T extends {}>(query: Query, options: Options): T;

export function parseQuery(query: Query, options: Options) {
  return queryString.parse(queryString.stringify(query, options), options);
}
