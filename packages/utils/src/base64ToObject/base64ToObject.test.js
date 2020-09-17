import { encode } from 'js-base64';
import base64ToObject from './base64ToObject';

const source = { foo: 'bar' };
const base64 = encode(JSON.stringify(source));

it('should parse object in base64 string format to javascript object', () => {
  expect(base64ToObject(base64)).toEqual(source);
});
