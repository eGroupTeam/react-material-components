/**
 * delete value in object
 */
export default function deleteIn(
  obj: Record<string, any> | Record<string, any>[],
  paths: (string | number)[]
) {
  let copy = obj;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (i === paths.length - 1) {
      delete copy[key];
    } else if (copy[key] != null) {
      copy = copy[key];
    } else {
      break;
    }
  }
}
