import cloneDeep from 'lodash.clonedeep';

/**
 * get value in object
 * @param {any} obj
 * @param {Array<String>} paths
 * @param {any} defaultValue
 */
export default function getIn(
  obj: any,
  paths: (string | number)[],
  defaultValue?: any
) {
  if (!obj) return;
  let copy = obj;
  let result: any;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (i === paths.length - 1) {
      if (copy[key]) {
        result = cloneDeep(copy[key]);
      } else {
        result = cloneDeep(defaultValue);
      }
    } else {
      if (!copy[key]) {
        result = cloneDeep(defaultValue);
        break;
      }
      copy = copy[key];
    }
  }
  return result;
}
