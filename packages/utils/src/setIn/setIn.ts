/**
 * set value in object
 */
export default function setIn(
  obj: any,
  paths: (string | number)[],
  value: any
) {
  if (!obj) return;
  let copy = obj;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];

    if (i === paths.length - 1) {
      copy[key] = value;
    } else {
      if (!copy[key]) {
        copy[key] = {};
      }
      copy = copy[key];
    }
  }
}
