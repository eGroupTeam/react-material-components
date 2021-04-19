import { handleActions } from 'redux-actions';
import { fromJS, Map } from '@e-group/immutable';
import merger from './merger';
import {
  SET_ENTITIES,
  SET_ENTITIES_SHALLOW,
  SET_ENTITIES_ARRAY_CONCAT,
  DELETE_ENTITIES_IN,
} from '../../entities';

const initialState = fromJS({});

/**
 * Reducer
 */
export const entities = handleActions<any>(
  {
    [SET_ENTITIES]: (state, action) => {
      if (action.payload) {
        if (
          (action as any).meta &&
          typeof Array.isArray((action as any).meta.path)
        ) {
          return state.setIn(
            (action as any).meta.path,
            state
              .getIn((action as any).meta.path, Map())
              .mergeWith(merger, action.payload)
          );
        }
        return state.mergeWith(merger, action.payload);
      }
      return state;
    },
    [SET_ENTITIES_SHALLOW]: (state, action) => {
      if (action.payload) {
        if (
          (action as any).meta &&
          typeof Array.isArray((action as any).meta.path)
        ) {
          return state.mergeIn((action as any).meta.path, action.payload);
        }
        return state.merge(action.payload);
      }
      return state;
    },
    [SET_ENTITIES_ARRAY_CONCAT]: (state, action) => {
      if (action.payload) {
        if (
          (action as any).meta &&
          typeof Array.isArray((action as any).meta.path)
        ) {
          return state.setIn(
            (action as any).meta.path,
            state
              .getIn((action as any).meta.path, Map())
              .mergeDeep(action.payload)
          );
        }
        return state.mergeDeep(action.payload);
      }
      return state;
    },
    [DELETE_ENTITIES_IN]: (state, action) => {
      if (action.payload) {
        return state.deleteIn(action.payload);
      }
      return state;
    },
  },
  initialState
);
