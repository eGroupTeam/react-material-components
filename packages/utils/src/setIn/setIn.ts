/**
 * set value in object
 */
export default function setIn(
  obj: Record<string, any> | Record<string, any>[],
  paths: (string | number)[],
  value: any
) {
  let copy = obj;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (i === paths.length - 1) {
      copy[key] = value;
    } else {
      if (copy[key] == null) {
        copy[key] = {};
      }
      copy = copy[key];
    }
  }
}
