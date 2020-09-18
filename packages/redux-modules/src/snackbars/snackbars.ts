import { createReducer } from '@reduxjs/toolkit';
import produce from 'immer';
import merge from 'lodash.merge';
import warning from 'warning';
import setIn from '@e-group/utils/setIn';
import hasIn from '@e-group/utils/hasIn';
import { supportedTypes } from '../utils';

import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR_DATA,
} from './types';

const initialState = {};

/**
 * Reducer
 */
export const snackbars = createReducer(initialState, {
  [INITIALIZE_SNACKBAR]: produce((draft, action) => {
    if (!action.payload) return;
    const [isSupported, type] = supportedTypes(action.payload, ['string']);
    if (!isSupported) {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Action "initializeSnackbar" is not supported "${type}" payload.`
      );
      return;
    }
    setIn(draft, [action.payload, 'isOpen'], false);
  }),
  [OPEN_SNACKBAR]: produce((draft, action) => {
    if (!action.payload) return;
    const [isSupported, type] = supportedTypes(action.payload, ['string']);
    if (!isSupported) {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Action "openSnackbar" is not supported "${type}" payload.`
      );
      return;
    }
    const name = action.payload;
    if (hasIn(draft, [name])) {
      setIn(draft, [name, 'isOpen'], true);
    }
  }),
  [CLOSE_SNACKBAR]: produce((draft, action) => {
    if (!action.payload) return;
    const [isSupported, type] = supportedTypes(action.payload, ['string']);
    if (!isSupported) {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Action "closeSnackbar" is not supported "${type}" payload.`
      );
      return;
    }
    const name = action.payload;
    if (hasIn(draft, [name])) {
      setIn(draft, [name, 'isOpen'], false);
    }
  }),
  [SET_SNACKBAR_DATA]: produce((draft, action) => {
    if (!action.payload) return;
    const [isSupported, type] = supportedTypes(action.payload, ['object']);
    if (!isSupported) {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Action "setSnackbarData" is not supported "${type}" payload.`
      );
      return;
    }
    const { name, ...other } = action.payload;
    if (hasIn(draft, [name])) {
      merge(draft[name], other);
    } else {
      warning(
        false,
        `[@e-group/redux-modules] ERROR: Snackbar "${name}" is not exist.`
      );
    }
  }),
});
