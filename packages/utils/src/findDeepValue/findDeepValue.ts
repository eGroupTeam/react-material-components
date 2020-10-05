/**
 * To solve index path bug please read this for more detail.
 * https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
 */
const findDeepValue = <T>(obj: any, path = ''): T | undefined => {
  const matchArray = path.match(/[^\]\\[.]+/g) ?? [];
  return matchArray.reduce((o, i) => {
    if (o) {
      return o[i];
    }
    return undefined;
  }, obj);
};

export default findDeepValue;
