
import mergeDeep from './mergeDeep';

describe('mergeDeep', () => {

  it('should merge object deeply', () => {
    const object = {
      a: {
        foo: 'bar',
        bar: {
          foo: 'bar'
        }
      }
    };
     
    const other = {
      a: {
        foo: 'bar-foo',
        bar: {
          zoo: 'bar'
        }
      }
    };
    
    expect(mergeDeep(object, other)).toEqual({
      a: {
        foo: 'bar-foo',
        bar: {
          foo: 'bar',
          zoo: 'bar'
        }
      }
    });
  })

  it('should merge object within array deeply', () => {
    const object = {
      'a': [{ 'b': 2 }, { 'd': 4 }]
    };
     
    const other = {
      'a': [{ 'c': 3 }, { 'e': 5 }]
    };
    
    expect(mergeDeep(object, other)).toEqual({ 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] });
  })
});
