import { encode } from 'js-base64';
import safeJsonStringify from 'safe-json-stringify';

/**
 * A function parse javascript Json object to base64 string.
 * @param {*} object
 */
export default function objectToBase64(object) {
  return encode(safeJsonStringify(object));
}
