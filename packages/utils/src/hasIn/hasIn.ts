/**
 * Does value has in object
 */
export default function hasIn(
  obj: Record<string, any> | Record<string, any>[],
  paths: (string | number)[]
) {
  let copy = obj;
  let result = false;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (copy[key] != null) {
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
