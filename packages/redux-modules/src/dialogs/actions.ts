import { createAction } from '@reduxjs/toolkit';

import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_DATA,
} from './types';

export const initializeDialog = createAction<string | undefined>(
  INITIALIZE_DIALOG
);
export const openDialog = createAction<string | undefined>(OPEN_DIALOG);
export const closeDialog = createAction<string | undefined>(CLOSE_DIALOG);
export const setDialogData = createAction<Record<string, unknown> | undefined>(
  SET_DIALOG_DATA
);
