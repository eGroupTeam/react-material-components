import { decode } from 'js-base64';

/**
 * A function parse base64 string to javascript object.
 * @param {*} b64String
 */
export default function base64ToObject(b64String) {
  return JSON.parse(decode(b64String));
}
