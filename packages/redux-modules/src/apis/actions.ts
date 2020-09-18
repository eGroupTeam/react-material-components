import { createAction, PayloadAction } from '@reduxjs/toolkit';

import {
  EG_API_TAKE,
  EG_API_REQUEST,
  EG_API_CANCEL,
  EG_API_SUCCESS,
  EG_API_FAILURE,
  EG_CLEAR_API_RESPONSE,
  EG_CLEAR_APIS_RESPONSE,
  EG_DESTROY_API,
} from './types';

export const egApiTake = createAction<{
  leafs: unknown;
}>(EG_API_TAKE);
export const egApiRequest = createAction<{
  leafs: unknown;
}>(EG_API_REQUEST);
export const egApiCancel = createAction<{
  leafs: unknown;
}>(EG_API_CANCEL);
export const egApiSuccess = createAction<{
  leafs: unknown;
  response?: unknown;
}>(EG_API_SUCCESS);
export const egApiFailure = createAction<{
  leafs: unknown;
  error?: unknown;
}>(EG_API_FAILURE);
export const clearApiResponse = createAction<PayloadAction | undefined>(
  EG_CLEAR_API_RESPONSE
);
export const clearApisResponse = createAction<PayloadAction[] | undefined>(
  EG_CLEAR_APIS_RESPONSE
);
export const destroyApi = createAction<string[] | undefined>(EG_DESTROY_API);
