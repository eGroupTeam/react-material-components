import parseReactSelectOptions from './parseReactSelectOptions';

describe('parseReactSelectOptions', () => {
  it('should parse react select options', () => {
    const users = [
      {
        userName: 'Jerry',
        userAge: '18',
        userId: '1',
        userAcount: 'one punch',
      },
    ];
    const userOptionParser = (data) =>
      parseReactSelectOptions({
        labelPath: ['userName'],
        valuePath: ['userId'],
        options: users,
      });
    expect(userOptionParser(users)).toEqual([
      {
        userName: 'Jerry',
        userAge: '18',
        userId: '1',
        userAcount: 'one punch',
        label: 'Jerry',
        value: '1',
      },
    ]);
  });
});
