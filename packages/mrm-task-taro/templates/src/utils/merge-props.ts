export function mergeProps<A, B>(a: A, b: B): B & A;
export function mergeProps<A, B, C>(a: A, b: B, c: C): C & B & A;

export function mergeProps(...items: any[]) {
  let result = {};

  items.forEach((item) => {
    result = { ...result, ...item };
  });

  return result;
}
