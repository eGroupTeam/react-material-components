/**
 * To solve index path bug please read this for more detail.
 * https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
 */
const indexPath = (obj = {}, path = ''): any => {
  const matchArray = path.match(/[^\]\\[.]+/g) ?? [];
  return matchArray.reduce((o, i) => o[i], obj);
};

export default indexPath;
