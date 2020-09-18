import { createAction } from '@reduxjs/toolkit';

import {
  SET_ENTITIES,
  SET_ENTITIES_SHALLOW,
  SET_ENTITIES_ARRAY_CONCAT,
  DELETE_ENTITIES_IN,
} from './types';

export const setEntities = createAction(
  SET_ENTITIES,
  (payload?: unknown, meta?: { path: string[] }) => ({
    payload,
    meta,
  })
);
export const setEntitiesShallow = createAction(
  SET_ENTITIES_SHALLOW,
  (payload?: unknown, meta?: { path: string[] }) => ({
    payload,
    meta,
  })
);
export const setEntitiesArrayConcat = createAction(
  SET_ENTITIES_ARRAY_CONCAT,
  (payload?: unknown, meta?: { path: string[] }) => ({
    payload,
    meta,
  })
);
export const deleteEntitiesIn = createAction<string[] | undefined>(
  DELETE_ENTITIES_IN
);
