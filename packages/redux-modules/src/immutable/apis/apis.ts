import { createReducer } from '@reduxjs/toolkit';
import { fromJS, Map } from 'immutable';
import warning from 'warning';
import { supportedTypes, getTrimedLeafs } from '../../utils';

import {
  EG_API_TAKE,
  EG_API_REQUEST,
  EG_API_CANCEL,
  EG_API_SUCCESS,
  EG_API_FAILURE,
  EG_CLEAR_API_RESPONSE,
  EG_CLEAR_APIS_RESPONSE,
  EG_DESTROY_API,
} from '../../apis';

const initialState = fromJS({});

/**
 * Reducer
 */
export const apis = createReducer(initialState, {
  [EG_API_TAKE]: (state, action) =>
    state.setIn([...action.payload.leafs, 'isError'], false),
  [EG_API_REQUEST]: (state, action) =>
    state.setIn([...action.payload.leafs, 'isLoading'], true),
  [EG_API_CANCEL]: (state, action) =>
    state.setIn([...action.payload.leafs, 'isLoading'], false),
  [EG_API_SUCCESS]: (state, action) => {
    let newState = state.setIn([...action.payload.leafs, 'isLoading'], false);

    if (typeof action.payload.response !== 'undefined') {
      newState = newState.setIn(
        [...action.payload.leafs, 'response'],
        action.payload.response
      );
    }

    return newState;
  },
  [EG_API_FAILURE]: (state, action) => {
    let newState = state.setIn([...action.payload.leafs, 'isLoading'], false);
    newState = newState.setIn([...action.payload.leafs, 'isError'], true);
    if (action.payload.error) {
      newState = newState.setIn(
        [...action.payload.leafs, 'error'],
        action.payload.error
      );
    }
    return newState;
  },
  [EG_CLEAR_API_RESPONSE]: (state, action) => {
    const [isSupported, type] = supportedTypes(action.payload, ['object']);
    if (!isSupported) {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Action "clearApiResponse" is not supported "${type}" payload.`
      );
      return state;
    }
    const actionType = action.payload.type;
    if (typeof actionType !== 'string') {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Redux action type need to be "string" not "${typeof actionType}"`
      );
      return state;
    }
    const trimedLeafs = getTrimedLeafs(actionType);
    return state.deleteIn([...trimedLeafs, 'response']);
  },
  [EG_CLEAR_APIS_RESPONSE]: (state, action) => {
    const [isSupported, type] = supportedTypes(action.payload, ['array']);
    if (!isSupported) {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Action "clearApisResponse" is not supported ${type} payload.`
      );
      return state;
    }
    const actionTypes: string[] = [];
    for (let i = 0; i < action.payload.length; i++) {
      const actionType = action.payload[i].type;
      if (typeof actionType !== 'string') {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Redux action type need to be "string" not "${typeof actionType}"`
        );
        return state;
      }
      actionTypes.push(actionType);
    }
    let nextState = state;
    actionTypes.forEach((actionType) => {
      const trimedLeafs = getTrimedLeafs(actionType);
      nextState = nextState.deleteIn([...trimedLeafs, 'response']);
    });
    return nextState;
  },
  [EG_DESTROY_API]: (state, action) => {
    const [isSupported, type] = supportedTypes(action.payload, ['array']);
    if (!isSupported) {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Action "destroyApi" is not supported ${type} payload.`
      );
      return state;
    }
    if (state.hasIn(action.payload)) {
      return state.setIn(action.payload, Map());
    }
    return state;
  },
});
