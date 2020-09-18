import supportedTypes from './supportedTypes';

describe('supportedTypes', () => {
  it('should return true and object type', () => {
    const [isSupported, type] = supportedTypes({}, ['object', 'array']);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('object');
  });
  it('should return true and array type', () => {
    const [isSupported, type] = supportedTypes([], ['object', 'array']);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('array');
  });
  it('should return true and null type', () => {
    const [isSupported, type] = supportedTypes(null, ['array', 'null']);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('null');
  });
  it('should return false and object type', () => {
    const [isSupported, type] = supportedTypes({}, ['null', 'array']);
    expect(isSupported).toEqual(false);
    expect(type).toEqual('object');
  });
  it('should return false and array type', () => {
    const [isSupported, type] = supportedTypes([], ['null', 'object']);
    expect(isSupported).toEqual(false);
    expect(type).toEqual('array');
  });
  it('should return false and null type', () => {
    const [isSupported, type] = supportedTypes(null, ['array', 'object']);
    expect(isSupported).toEqual(false);
    expect(type).toEqual('null');

    const [isSupportedRevert, typeRevert] = supportedTypes(null, [
      'object',
      'array',
    ]);
    expect(isSupportedRevert).toEqual(false);
    expect(typeRevert).toEqual('null');
  });

  it('should return true and boolean type', () => {
    const [isSupported, type] = supportedTypes(true, ['boolean', 'array']);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('boolean');
  });
  it('should return true and number type', () => {
    const [isSupported, type] = supportedTypes(1, ['boolean', 'number']);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('number');
  });
  it('should return true and undefined type', () => {
    const [isSupported, type] = supportedTypes(undefined, [
      'number',
      'undefined',
    ]);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('undefined');
  });
  it('should return true and string type', () => {
    const [isSupported, type] = supportedTypes('', ['string', 'undefined']);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('string');
  });
  it('should return true and function type', () => {
    const [isSupported, type] = supportedTypes(() => {}, [
      'string',
      'function',
    ]);
    expect(isSupported).toEqual(true);
    expect(type).toEqual('function');
  });
});
