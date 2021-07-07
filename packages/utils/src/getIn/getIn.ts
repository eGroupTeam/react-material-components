import cloneDeep from 'lodash.clonedeep';

/**
 * get value in object
 */
export default function getIn(
  obj: Record<string, unknown> | Record<string, unknown>[],
  paths: (string | number)[],
  defaultValue?: unknown
) {
  let copy = obj;
  let result: unknown;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (i === paths.length - 1) {
      if (copy[key] != null) {
        result = cloneDeep(copy[key]);
      } else {
        result = cloneDeep(defaultValue);
      }
    } else {
      if (copy[key] == null) {
        result = cloneDeep(defaultValue);
        break;
      }
      copy = copy[key];
    }
  }
  return result;
}
