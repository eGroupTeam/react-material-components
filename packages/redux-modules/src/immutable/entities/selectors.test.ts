import { fromJS } from 'immutable';
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
  const rootStates = fromJS(defaultEntities);
  const state = fromJS({
    entities: defaultEntities,
  });
  it('should get entities', () => {
    expect(getEntities(state)).toEqual(rootStates);
  });
});
