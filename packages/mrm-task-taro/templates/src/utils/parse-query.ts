import queryString, { StringifyOptions, ParseOptions } from 'query-string';

type Options = StringifyOptions &
  ParseOptions & {
    trimStrings?: boolean;
  };

type Query = Partial<Record<string, string>>;

export function parseQuery<T extends {}>(query: Query, options: Options): T;

export function parseQuery(query: Query, options: Options) {
  return queryString.parse(queryString.stringify(query, options), options);
}
