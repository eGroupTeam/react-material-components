import { getEntities } from './selectors';

const defaultEntities = {
  users: {
    1: {
      id: '1',
      name: 'Jerry',
      roles: {
        admin: {
          roleName: 'admin',
          roleStatus: 'checked',
        },
      },
    },
  },
};

describe('entities selectors', () => {
  const rootStates = defaultEntities;
  const state = {
    entities: defaultEntities,
  };
  it('should get entities', () => {
    expect(getEntities(state)).toEqual(rootStates);
  });
});
