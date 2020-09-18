import { createAction } from '@reduxjs/toolkit';

import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR_DATA,
} from './types';

export const initializeSnackbar = createAction<string | undefined>(
  INITIALIZE_SNACKBAR
);
export const openSnackbar = createAction<string | undefined>(OPEN_SNACKBAR);
export const closeSnackbar = createAction<string | undefined>(CLOSE_SNACKBAR);
export const setSnackbarData = createAction<
  Record<string, unknown> | undefined
>(SET_SNACKBAR_DATA);
