/* eslint-disable no-param-reassign */
import flatten from '../flatten';

/**
 * Refer to hughsk/flat.
 * https://github.com/hughsk/flat/blob/master/index.js
 */
export default function unflatten<R = any>(target: any): R {
  const delimiter = '.';
  const result: any = {};

  if (Object.prototype.toString.call(target) !== '[object Object]') {
    return target;
  }

  function addKeys(keyPrefix: string, recipient: any, target: any) {
    return Object.keys(target).reduce((result, key) => {
      result[keyPrefix + delimiter + key] = target[key];

      return result;
    }, recipient);
  }

  function isEmpty(val: any) {
    const type = Object.prototype.toString.call(val);
    const isArray = type === '[object Array]';
    const isObject = type === '[object Object]';

    if (!val) {
      return true;
    }
    if (isArray) {
      return !val.length;
    }
    if (isObject) {
      return !Object.keys(val).length;
    }
    return false;
  }

  target = Object.keys(target).reduce((result: any, key) => {
    const type = Object.prototype.toString.call(target[key]);
    const isObject = type === '[object Object]' || type === '[object Array]';
    if (!isObject || isEmpty(target[key])) {
      result[key] = target[key];
      return result;
    }
    return addKeys(key, result, flatten(target[key]));
  }, {});

  Object.keys(target).forEach((key) => {
    const split = key.split(delimiter);
    let key1 = split.shift();
    let key2 = split[0];
    let recipient = result;

    while (key2 !== undefined) {
      if (!key1) {
        return;
      }

      const type = Object.prototype.toString.call(recipient[key1]);
      const isobject = type === '[object Object]' || type === '[object Array]';

      // do not write over falsey, non-undefined values
      if (!isobject && typeof recipient[key1] !== 'undefined') {
        return;
      }

      if (recipient[key1] == null) {
        recipient[key1] = {};
      }

      recipient = recipient[key1];
      if (split.length > 0) {
        key1 = split.shift();
        // eslint-disable-next-line prefer-destructuring
        key2 = split[0];
      }
    }

    // unflatten again for 'messy objects'
    if (key1) {
      recipient[key1] = unflatten(target[key]);
    }
  });

  return result;
}
