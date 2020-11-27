/**
 * Remove duplicate value from array.
 * Ref: https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
 */
export default function unique<T = string>(array: T[]) {
  return Array.from(new Set(array));
}
