/**
 * To filter Object keys.
 * more detail: https://stackoverflow.com/questions/38750705/filter-object-properties-by-key-in-es6
 */
export default function objectKeysFilter<P>(obj: P, allowedKeys: string[]) {
  return Object.keys(obj)
    .filter((key) => allowedKeys.includes(key))
    .reduce(
      (result, key) => ({
        ...result,
        [key]: obj[key],
      }),
      {}
    );
}
