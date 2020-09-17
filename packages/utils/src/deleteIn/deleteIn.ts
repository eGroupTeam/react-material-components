/**
 * delete value in object
 * @param {any} obj
 * @param {Array<String>} paths
 */
export default function deleteIn(obj: any, paths: (string | number)[]) {
  if (!obj) return;
  let copy = obj;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (i === paths.length - 1) {
      delete copy[key];
    } else if (copy[key]) {
      copy = copy[key];
    } else {
      break;
    }
  }
}
