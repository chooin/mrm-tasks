export function mergeList<A = any, B = any>(a: any, b: any): (A | B)[];
export function mergeList<A = any, B = any, C = any>(
  a: any,
  b: any,
  c: any,
): (A | B | C)[];

export function mergeList(...items: any[]) {
  let result: typeof items = [];

  items.forEach((item) => {
    if (Array.isArray(item)) {
      result = [...result, ...item];
    }
  });

  return result;
}
