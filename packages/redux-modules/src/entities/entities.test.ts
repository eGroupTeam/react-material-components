import { setEntities, setEntitiesShallow } from './actions';
import { entities as reducer } from './entities';

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
const entities = {
  users: {
    1: {
      id: '1',
      name: 'Jerry',
      roles: {},
    },
  },
};

describe('entities reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '', payload: {} })).toEqual({});
  });

  it('should handle SET_ENTITIES', () => {
    expect(reducer({}, setEntities(entities))).toEqual(entities);
  });

  it('should handle SET_ENTITIES without any change', () => {
    expect(reducer({}, setEntities())).toEqual({});
    expect(reducer({}, setEntities({}))).toEqual({});
  });

  it('should handle SET_ENTITIES with meta', () => {
    expect(
      reducer(
        {},
        setEntities(entities.users, {
          path: ['users'],
        })
      )
    ).toEqual(entities);

    expect(
      reducer(
        defaultEntities,
        setEntities(entities.users, {
          path: ['users'],
        })
      )
    ).toEqual(defaultEntities);
  });

  it('should handle SET_ENTITIES with default entities', () => {
    expect(reducer(defaultEntities, setEntities(entities))).toEqual(
      defaultEntities
    );
  });

  it('should handle SET_ENTITIES_SHALLOW', () => {
    expect(reducer({}, setEntitiesShallow(entities))).toEqual(entities);
  });

  it('should handle SET_ENTITIES_SHALLOW without any change', () => {
    expect(reducer({}, setEntitiesShallow())).toEqual({});
    expect(reducer({}, setEntitiesShallow({}))).toEqual({});
  });

  it('should handle SET_ENTITIES_SHALLOW with meta', () => {
    expect(
      reducer(
        {},
        setEntitiesShallow(entities.users, {
          path: ['users'],
        })
      )
    ).toEqual(entities);

    expect(
      reducer(
        {
          users: {
            1: {
              id: '1',
              name: 'Leo',
            },
          },
        },
        setEntitiesShallow(entities.users, {
          path: ['users'],
        })
      )
    ).toEqual(entities);
  });

  it('should handle SET_ENTITIES_SHALLOW with default entities', () => {
    expect(reducer(defaultEntities, setEntitiesShallow(entities))).toEqual(
      entities
    );
  });
});
