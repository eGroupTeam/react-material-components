import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { createAction } from '@reduxjs/toolkit';
import fetchMock from 'fetch-mock';
import createHandleApisMiddleware from './createHandleApisMiddleware';
import {
  EG_API_TAKE,
  EG_API_REQUEST,
  EG_API_CANCEL,
  EG_API_SUCCESS,
  EG_API_FAILURE,
} from '../apis/types';

const mockStore = configureStore([createHandleApisMiddleware(), thunk]);

const fetchGetMember = createAction('components/list/fetchGetMember');
const fetchGetMemberRequest = createAction(
  'components/list/fetchGetMemberRequest'
);
const fetchGetMemberCancel = createAction(
  'components/list/fetchGetMemberCancel'
);
const fetchGetMemberSuccess = createAction<Record<string, unknown> | undefined>(
  'components/list/fetchGetMemberSuccess'
);
const fetchGetMemberFailure = createAction<Error | undefined>(
  'components/list/fetchGetMemberFailure'
);

describe('createHandleApisMiddleware', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('should dispatch none fetch action', () => {
    const store = mockStore({});
    store.dispatch({
      type: 'CLOSE_WINDOW',
    });
    const actions = store.getActions();
    const expected = [
      {
        type: 'CLOSE_WINDOW',
      },
    ];
    expect(actions).toEqual(expected);
  });

  it('should dispatch egApiTake', () => {
    const store = mockStore({});
    store.dispatch(fetchGetMember());
    const actions = store.getActions();
    const expected = [
      {
        type: EG_API_TAKE,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
        },
      },
      fetchGetMember(),
    ];
    expect(actions).toEqual(expected);
  });

  it('should dispatch egApiRequest', () => {
    const store = mockStore({});
    store.dispatch(fetchGetMemberRequest());
    const actions = store.getActions();
    const expected = [
      {
        type: EG_API_REQUEST,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
        },
      },
      fetchGetMemberRequest(),
    ];
    expect(actions).toEqual(expected);
  });

  it('should dispatch egApiCancel', () => {
    const store = mockStore({});
    store.dispatch(fetchGetMemberCancel());
    const actions = store.getActions();
    const expected = [
      {
        type: EG_API_CANCEL,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
        },
      },
      fetchGetMemberCancel(),
    ];
    expect(actions).toEqual(expected);
  });

  it('should dispatch egApiSuccess', () => {
    const store = mockStore({});
    store.dispatch(fetchGetMemberSuccess());
    const actions = store.getActions();
    const expected = [
      {
        type: EG_API_SUCCESS,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
        },
      },
      fetchGetMemberSuccess(),
    ];
    expect(actions).toEqual(expected);
  });

  it('should dispatch egApiFailure', () => {
    const store = mockStore({});
    store.dispatch(fetchGetMemberFailure());
    const actions = store.getActions();
    const expected = [
      {
        type: EG_API_FAILURE,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
        },
      },
      fetchGetMemberFailure(),
    ];
    expect(actions).toEqual(expected);
  });

  it('should fetch member success', () => new Promise((resolve) => {
      const data = { memberId: 11111 };
      const store = mockStore({});
      const expectedActions = [
        {
          type: EG_API_TAKE,
          payload: {
            leafs: ['components', 'list', 'fetchGetMember'],
          },
        },
        fetchGetMember(),
        {
          type: EG_API_REQUEST,
          payload: {
            leafs: ['components', 'list', 'fetchGetMember'],
          },
        },
        fetchGetMemberRequest(),
        {
          type: EG_API_SUCCESS,
          payload: {
            leafs: ['components', 'list', 'fetchGetMember'],
            response: data,
          },
        },
        fetchGetMemberSuccess(data),
      ];

      fetchMock.get('http://good.com/', data);

      store.dispatch(fetchGetMember());
      store.dispatch(fetchGetMemberRequest());
      fetch('http://good.com/')
        .then((res) => res.json())
        .then((data) => {
          store.dispatch(fetchGetMemberSuccess(data));
          expect(store.getActions()).toEqual(expectedActions);
          resolve(data);
        });
    }));

  it('should fetch member failure', async () => {
    const store = mockStore({});
    const expectedActions = [
      {
        type: EG_API_TAKE,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
        },
      },
      fetchGetMember(),
      {
        type: EG_API_REQUEST,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
        },
      },
      fetchGetMemberRequest(),
      {
        type: EG_API_FAILURE,
        payload: {
          leafs: ['components', 'list', 'fetchGetMember'],
          error: new TypeError('Failed to fetch'),
        },
      },
      fetchGetMemberFailure(new TypeError('Failed to fetch')),
    ];

    fetchMock.get('http://good.com/', {
      throws: new TypeError('Failed to fetch'),
    });

    store.dispatch(fetchGetMember());
    store.dispatch(fetchGetMemberRequest());
    await fetch('http://good.com/').catch((error) => {
      store.dispatch(fetchGetMemberFailure(error));
    });
    expect(store.getActions()).toEqual(expectedActions)
  });
});
