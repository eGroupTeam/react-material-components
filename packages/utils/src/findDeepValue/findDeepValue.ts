/**
 * To solve index path bug please read this for more detail.
 * https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
 */
const findDeepValue = <R>(obj: any, path = '') => {
  const matchArray = path.match(/[^\]\\[.]+/g) ?? [];
  const result = matchArray.reduce((o, i) => {
    if (o) {
      return o[i];
    }
    return undefined;
  }, obj);
  if (!result) {
    return undefined;
  }
  return result as R;
};

export default findDeepValue;
