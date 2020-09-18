import { fromJS, Map } from 'immutable';
import {
  setEntities,
  setEntitiesShallow,
  setEntitiesArrayConcat,
  deleteEntitiesIn,
} from '../../entities';
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
    expect(reducer(undefined, { type: '', payload: Map({}) })).toEqual(
      fromJS({})
    );
  });

  it('should handle SET_ENTITIES', () => {
    expect(reducer(fromJS({}), setEntities(fromJS(entities)))).toEqual(
      fromJS(entities)
    );
  });

  it('should handle SET_ENTITIES without value', () => {
    expect(reducer(fromJS({}), setEntities())).toEqual(fromJS({}));
  });

  it('should handle SET_ENTITIES with meta', () => {
    expect(
      reducer(
        fromJS({}),
        setEntities(fromJS(entities.users), {
          path: ['users'],
        })
      )
    ).toEqual(fromJS(entities));

    expect(
      reducer(
        fromJS(defaultEntities),
        setEntities(fromJS(entities.users), {
          path: ['users'],
        })
      )
    ).toEqual(fromJS(defaultEntities));
  });

  it('should handle SET_ENTITIES with default entities', () => {
    expect(
      reducer(fromJS(defaultEntities), setEntities(fromJS(entities)))
    ).toEqual(fromJS(defaultEntities));
  });

  it('should handle SET_ENTITIES_SHALLOW', () => {
    expect(reducer(fromJS({}), setEntitiesShallow(fromJS(entities)))).toEqual(
      fromJS(entities)
    );
  });

  it('should handle SET_ENTITIES_SHALLOW without value', () => {
    expect(reducer(fromJS({}), setEntitiesShallow())).toEqual(fromJS({}));
  });

  it('should handle SET_ENTITIES_SHALLOW with meta', () => {
    expect(
      reducer(
        fromJS({}),
        setEntitiesShallow(fromJS(entities.users), {
          path: ['users'],
        })
      )
    ).toEqual(fromJS(entities));

    expect(
      reducer(
        fromJS({
          users: {
            1: {
              id: '1',
              name: 'Leo',
            },
          },
        }),
        setEntitiesShallow(fromJS(entities.users), {
          path: ['users'],
        })
      )
    ).toEqual(fromJS(entities));
  });

  it('should handle SET_ENTITIES_SHALLOW with default entities', () => {
    expect(
      reducer(fromJS(defaultEntities), setEntitiesShallow(fromJS(entities)))
    ).toEqual(fromJS(entities));
  });

  it('should handle SET_ENTITIES_ARRAY_CONCAT', () => {
    expect(
      reducer(fromJS({}), setEntitiesArrayConcat(fromJS(entities)))
    ).toEqual(fromJS(entities));
  });

  it('should handle SET_ENTITIES_ARRAY_CONCAT without value', () => {
    expect(reducer(fromJS({}), setEntitiesArrayConcat())).toEqual(fromJS({}));
  });

  it('should handle SET_ENTITIES_ARRAY_CONCAT with meta', () => {
    expect(
      reducer(
        fromJS({}),
        setEntitiesArrayConcat(fromJS(entities.users), {
          path: ['users'],
        })
      )
    ).toEqual(fromJS(entities));

    expect(
      reducer(
        fromJS(defaultEntities),
        setEntitiesArrayConcat(fromJS(entities.users), {
          path: ['users'],
        })
      )
    ).toEqual(fromJS(defaultEntities));
  });

  it('should handle SET_ENTITIES_ARRAY_CONCAT with default entities', () => {
    expect(
      reducer(fromJS(defaultEntities), setEntitiesArrayConcat(fromJS(entities)))
    ).toEqual(fromJS(defaultEntities));
  });

  it('should handle SET_ENTITIES_ARRAY_CONCAT with concat deep array', () => {
    expect(
      reducer(
        fromJS({
          foo: {
            bar: ['a', 'b', 'c', 'd'],
          },
        }),
        setEntitiesArrayConcat(
          fromJS({
            foo: {
              bar: ['d', 'e', 'f'],
            },
          })
        )
      )
    ).toEqual(
      fromJS({
        foo: {
          bar: ['a', 'b', 'c', 'd', 'd', 'e', 'f'],
        },
      })
    );
  });

  it('should handle DELETE_ENTITIES_IN', () => {
    expect(
      reducer(fromJS(defaultEntities), deleteEntitiesIn(['users', '1']))
    ).toEqual(fromJS({ users: {} }));
  });

  it('should handle DELETE_ENTITIES_IN without value', () => {
    expect(reducer(fromJS({}), deleteEntitiesIn())).toEqual(fromJS({}));
  });
});
