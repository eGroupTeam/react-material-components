import { TestScheduler } from 'rxjs/testing';
import { of, concat, Subject } from 'rxjs';
import { createAction } from 'redux-actions';

import { ActionsObservable, StateObservable } from 'redux-observable';
import makeBasicFetchEpic from './makeBasicFetchEpic';

/**
 * ActionsObservable type error solution.
 * https://github.com/redux-observable/redux-observable/issues/620
 */
const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});
const mockState$ = new StateObservable(new Subject(), {});
/**
 * Create a fetchEpic
 */
const FETCH_GET_USER = 'FETCH_GET_USER';
const FETCH_GET_USER_REQUEST = 'FETCH_GET_USER_REQUEST';
const FETCH_GET_USER_SUCCESS = 'FETCH_GET_USER_SUCCESS';
const FETCH_GET_USER_FAILURE = 'FETCH_GET_USER_FAILURE';

const fetchGetUser = createAction(FETCH_GET_USER);
const fetchGetUserRequest = createAction(FETCH_GET_USER_REQUEST);
const fetchGetUserSuccess = createAction(FETCH_GET_USER_SUCCESS);
const fetchGetUserFailure = createAction(FETCH_GET_USER_FAILURE);

const fetchGetUserEpic = makeBasicFetchEpic({
  actionType: FETCH_GET_USER,
  apiName: 'fetchGetUser',
  fetchRequest: fetchGetUserRequest,
  handleSuccess: (response, { action }) => {
    if (action.payload && action.payload.callback) {
      action.payload.callback({
        id: 1,
      });
    }
    return [fetchGetUserSuccess(response.data)];
  },
  handleFailure: (error) => concat(of(fetchGetUserFailure(error))),
});

describe('makeBasicFetchEpic', () => {
  it('sholud handle success', () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actionInput$ = hot('-a', {
        a: fetchGetUser({
          id: 10,
        }),
      });
      const action$ = new ActionsObservable(actionInput$);
      const response = {
        status: 200,
        data: ['a', 'b', 'c'],
      };
      const dependencies = {
        apis: {
          fetchGetUser: ({ id }) =>
            cold('-a', {
              a: response,
            }),
        },
      };

      const output$ = fetchGetUserEpic(action$, mockState$, dependencies);
      const expectedMarble = '-ab';
      const expectedValues = {
        a: {
          type: FETCH_GET_USER_REQUEST,
        },
        b: {
          type: FETCH_GET_USER_SUCCESS,
          payload: response.data,
        },
      };

      expectObservable(output$).toBe(expectedMarble, expectedValues);
    });
  });

  it('sholud throw need apis dependency error', () => new Promise((resolve) => {
      const action$ = new ActionsObservable(of(fetchGetUser()));
      const output$ = fetchGetUserEpic(action$, mockState$, {});
      output$.subscribe(
        () => {
          resolve(new Error('should not be called'));
        },
        (err) => {
          expect(err).toEqual(
            new Error('makeBasicFetchEpic need setup apis dependency.')
          );
          resolve(err);
        }
      );
    }));

  it('sholud throw api is missing error', () => new Promise((resolve) => {
      const action$ = new ActionsObservable(of(fetchGetUser()));
      const output$ = fetchGetUserEpic(action$, mockState$, {
        apis: {},
      });
      output$.subscribe(
        () => {
          resolve(new Error('should not be called'));
        },
        (err) => {
          expect(err).toEqual(
            new Error('fetchGetUser is missing in apis dependency.')
          );
          resolve(err);
        }
      );
    }));

  const apis = {
    fetchGetUser: () =>
      new Promise<void>((resolve) => {
        resolve();
      }),
  };

  it('sholud excute callback after success', () => new Promise((resolve) => {
      const actionInput$ = of(
        fetchGetUser({
          callback: (data) => {
            expect(data).toEqual({
              id: 1,
            });
            resolve(data);
          },
        })
      );
      const action$ = new ActionsObservable(actionInput$);
      const output$ = fetchGetUserEpic(action$, mockState$, {
        apis,
      });
      output$.subscribe();
    }));

  it('sholud not have error with array payload', () => new Promise((resolve) => {
      const action$ = new ActionsObservable(of(fetchGetUser([])));
      const output$ = fetchGetUserEpic(action$, mockState$, {
        apis,
      });
      output$.subscribe((next) => {
        expect(next).toEqual({ type: 'FETCH_GET_USER_REQUEST' });
        resolve(next);
      });
    }));

  it('sholud not have error with string payload', () => new Promise((resolve) => {
      const action$ = new ActionsObservable(of(fetchGetUser('foo')));
      const output$ = fetchGetUserEpic(action$, mockState$, {
        apis,
      });
      output$.subscribe((next) => {
        expect(next).toEqual({ type: 'FETCH_GET_USER_REQUEST' });
        resolve(next);
      });
    }));

  it('sholud not have error with number payload', () => new Promise((resolve) => {
      const action$ = new ActionsObservable(of(fetchGetUser(100)));
      const output$ = fetchGetUserEpic(action$, mockState$, {
        apis,
      });
      output$.subscribe((next) => {
        expect(next).toEqual({ type: 'FETCH_GET_USER_REQUEST' });
        resolve(next);
      });
    }));
});
