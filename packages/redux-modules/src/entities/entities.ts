import { createReducer } from '@reduxjs/toolkit';
import produce from 'immer';
import warning from 'warning';
import assign from 'lodash.assign';
import mergeWith from 'lodash.mergewith';
import getIn from '@e-group/utils/getIn';
import setIn from '@e-group/utils/setIn';
import { SET_ENTITIES, SET_ENTITIES_SHALLOW } from './types';
import merger from './merger';
import { supportedTypes } from '../utils';

const initialState = {};

/**
 * Reducer
 */
export const entities = createReducer(initialState, {
  [SET_ENTITIES]: produce((draft, action) => {
    if (!action.payload) return;
    if (action.meta) {
      const [isSupported, type] = supportedTypes(action.meta.path, ['array']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "setEntities" is not supported "${type}" payload.`
        );
        return;
      }
      setIn(
        draft,
        action.meta.path,
        mergeWith(getIn(draft, action.meta.path), action.payload, merger)
      );
    } else {
      const [isSupported, type] = supportedTypes(action.payload, ['object']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "setEntities" is not supported "${type}" payload.`
        );
        return;
      }
      mergeWith(draft, action.payload, merger);
    }
  }),
  [SET_ENTITIES_SHALLOW]: produce((draft, action) => {
    if (!action.payload) return;
    if (action.meta) {
      const [isSupported, type] = supportedTypes(action.meta.path, ['array']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "setEntitiesShallow" is not supported "${type}" payload.`
        );
        return;
      }
      setIn(
        draft,
        action.meta.path,
        assign(getIn(draft, action.meta.path), action.payload)
      );
    } else {
      const [isSupported, type] = supportedTypes(action.payload, ['object']);
      if (!isSupported) {
        warning(
          false,
          `[@e-group/redux-modules] ERROR: Action "setEntities" is not supported "${type}" payload.`
        );
        return;
      }
      assign(draft, action.payload);
    }
  }),
});
