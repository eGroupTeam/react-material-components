type ObjectType =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function'
  | 'null'
  | 'array';

/**
 * Check variable has supported types(at least one of all).
 * @param {any} variable
 * @param {array} supportedTypes ["object", "null", "array", "boolean", "string", "bigint", "function", "number", "symbol", "undefined"]
 */
export default function supportedTypes(
  variable: any,
  supportedTypes: ObjectType[]
) {
  let objType: ObjectType = typeof variable;
  if (objType === 'object') {
    if (variable === null) {
      objType = 'null';
    } else if (Array.isArray(variable)) {
      objType = 'array';
    }
  }
  let isSupported = false;
  supportedTypes.forEach((supportedType) => {
    if (objType === supportedType) {
      isSupported = true;
    }
  });
  return [isSupported, objType];
}
