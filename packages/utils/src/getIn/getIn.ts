import cloneDeep from 'lodash.clonedeep';

/**
 * get value in object
 */
export default function getIn(
  obj: Record<string, any> | Record<string, any>[],
  paths: (string | number)[],
  defaultValue?: any
) {
  let copy = obj;
  let result: any;
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
