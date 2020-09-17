import shortUsername from './shortUsername';

const cnName = '王大明';
const enName = 'jerry';

it('should short chinese name', () => {
  expect(shortUsername(cnName)).toEqual('大明');
});

it('should short english name', () => {
  expect(shortUsername(enName)).toEqual('J');
});
