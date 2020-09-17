/**
 * Does value has in object
 * @param {any} obj
 * @param {Array<String>} paths
 */
export default function hasIn(obj: any, paths: (string | number)[]) {
  if (!obj) return;
  let copy = obj;
  let result = false;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (copy[key]) {
      if (i === paths.length - 1) {
        result = true;
      } else {
        copy = copy[key];
      }
    } else {
      break;
    }
  }
  return result;
}
