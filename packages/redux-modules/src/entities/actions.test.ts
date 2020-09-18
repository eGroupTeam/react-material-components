import { SET_ENTITIES, SET_ENTITIES_SHALLOW } from './types';
import { setEntities, setEntitiesShallow } from './actions';

const entities = {
  users: {
    1: {
      id: '1',
      name: 'Jerry',
      roles: {},
    },
  },
};

describe('entities actions', () => {
  it('should create an action to set entities', () => {
    const expectedAction = {
      type: SET_ENTITIES,
      payload: entities,
    };
    expect(setEntities(entities)).toEqual(expectedAction);
  });

  it('should create an action to set entities with meta', () => {
    const expectedAction = {
      type: SET_ENTITIES,
      payload: entities.users,
      meta: {
        path: ['users'],
      },
    };
    expect(
      setEntities(entities.users, {
        path: ['users'],
      })
    ).toEqual(expectedAction);
  });

  it('should create an action to set entities shallow', () => {
    const expectedAction = {
      type: SET_ENTITIES_SHALLOW,
      payload: entities,
    };
    expect(setEntitiesShallow(entities)).toEqual(expectedAction);
  });

  it('should create an action to set entities shallow with meta', () => {
    const expectedAction = {
      type: SET_ENTITIES_SHALLOW,
      payload: entities.users,
      meta: {
        path: ['users'],
      },
    };
    expect(
      setEntitiesShallow(entities.users, {
        path: ['users'],
      })
    ).toEqual(expectedAction);
  });
});
