/**
 * To solve index path bug please read this for more detail.
 * https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
 * @param {*} path
 * @param {*} obj
 */
const indexPath = (path, obj) =>
  path.match(/[^\]\[.]+/g).reduce((o, i) => o[i], obj);

export default indexPath;
