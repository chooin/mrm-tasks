export function mergeList<A, B>(a: A, b: B): any[];
export function mergeList<A, B, C>(a: A, b: B, c: C): any[];

export function mergeList(...items: any[]) {
  let result: typeof items[] = [];

  items.forEach((item) => {
    if (Array.isArray(item)) {
      result = [...result, ...item];
    }
  });

  return result;
}
