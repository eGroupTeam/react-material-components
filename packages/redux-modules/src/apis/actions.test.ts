import { createAction } from '@reduxjs/toolkit';

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
import {
  egApiTake,
  egApiRequest,
  egApiCancel,
  egApiSuccess,
  egApiFailure,
  clearApiResponse,
  clearApisResponse,
  destroyApi,
} from './actions';

const leafs = ['components', 'list', 'fetchGetMember'];

describe('apis module actions', () => {
  it('should create an action to take api', () => {
    const expectedAction = {
      type: EG_API_TAKE,
      payload: { leafs },
    };
    expect(egApiTake({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to request api', () => {
    const expectedAction = {
      type: EG_API_REQUEST,
      payload: { leafs },
    };
    expect(egApiRequest({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to cancel api', () => {
    const expectedAction = {
      type: EG_API_CANCEL,
      payload: { leafs },
    };
    expect(egApiCancel({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to handle api success with response', () => {
    const response = {
      data: 'data',
    };
    const expectedAction = {
      type: EG_API_SUCCESS,
      payload: { leafs, response },
    };
    expect(egApiSuccess({ leafs, response })).toEqual(expectedAction);
  });

  it('should create an action to handle api success without response', () => {
    const expectedAction = {
      type: EG_API_SUCCESS,
      payload: { leafs },
    };
    expect(egApiSuccess({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to handle api error', () => {
    const error = new Error();
    const expectedAction = {
      type: EG_API_FAILURE,
      payload: { leafs, error },
    };
    expect(egApiFailure({ leafs, error })).toEqual(expectedAction);
  });

  it('should create an action to handle api without error', () => {
    const expectedAction = {
      type: EG_API_FAILURE,
      payload: { leafs },
    };
    expect(egApiFailure({ leafs })).toEqual(expectedAction);
  });

  it('should create an action to clear single api response', () => {
    const fetchGetMember = createAction('FETCH_GET_MEMBER');
    // single
    const expectedAction = {
      type: EG_CLEAR_API_RESPONSE,
      payload: fetchGetMember(),
    };
    expect(clearApiResponse(fetchGetMember())).toEqual(expectedAction);
  });

  it('should create an action to clear multiple api response', () => {
    const fetchGetMember = createAction('FETCH_GET_MEMBER');
    const fetchGetUser = createAction('FETCH_GET_USER');
    // multiple
    const expectedAction = {
      type: EG_CLEAR_APIS_RESPONSE,
      payload: [fetchGetMember(), fetchGetUser()],
    };
    expect(clearApisResponse([fetchGetMember(), fetchGetUser()])).toEqual(
      expectedAction
    );
  });

  it('should create an action to destroy api', () => {
    // multiple
    const expectedAction = {
      type: EG_DESTROY_API,
      payload: ['components', 'fetchGet'],
    };
    expect(destroyApi(['components', 'fetchGet'])).toEqual(expectedAction);
  });
});
