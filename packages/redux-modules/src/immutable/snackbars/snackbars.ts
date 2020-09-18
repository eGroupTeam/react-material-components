import { createReducer } from '@reduxjs/toolkit';
import { fromJS, Map, isImmutable, merge } from 'immutable';

import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR_DATA,
} from '../../snackbars';

const initialState = fromJS({});

/**
 * Reducer
 */
export const snackbars = createReducer(initialState, {
  [INITIALIZE_SNACKBAR]: (state, action) => {
    if (action.payload) {
      const name = String(action.payload);
      return state.update(name, (snackbarState) => {
        if (isImmutable(snackbarState)) {
          return snackbarState;
        }
        return Map({
          isOpen: false,
        });
      });
    }
    return state;
  },
  [OPEN_SNACKBAR]: (state, action) => {
    if (action.payload) {
      return state.setIn([action.payload, 'isOpen'], true);
    }
    return state;
  },
  [CLOSE_SNACKBAR]: (state, action) => {
    if (action.payload) {
      return state.setIn([action.payload, 'isOpen'], false);
    }
    return state;
  },
  [SET_SNACKBAR_DATA]: (state, action) => {
    if (action.payload) {
      const { name, ...other } = action.payload as any;
      if (name) {
        return state.update(name, (el) => {
          if (el) {
            return merge(el, other);
          }
          return el;
        });
      }
    }
    return state;
  },
});
