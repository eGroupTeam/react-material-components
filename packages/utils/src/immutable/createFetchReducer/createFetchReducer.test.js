import { Map } from 'immutable';
import createFetchReducer from './createFetchReducer';

const FETCH_GET_MEMBER = 'FETCH_GET_MEMBER';
const FETCH_GET_MEMBER_REQUEST = 'FETCH_GET_MEMBER_REQUEST';
const FETCH_GET_MEMBER_CANCEL = 'FETCH_GET_MEMBER_CANCEL';
const FETCH_GET_MEMBER_SUCCESS = 'FETCH_GET_MEMBER_SUCCESS';
const FETCH_GET_MEMBER_FAILURE = 'FETCH_GET_MEMBER_FAILURE';

const fetchReducer = createFetchReducer({
  take: FETCH_GET_MEMBER,
  request: FETCH_GET_MEMBER_REQUEST,
  cancel: FETCH_GET_MEMBER_CANCEL,
  success: FETCH_GET_MEMBER_SUCCESS,
  failure: FETCH_GET_MEMBER_FAILURE,
});

// To mock date please read this issue
// https://github.com/facebook/jest/issues/2234
const DATE_TO_USE = new Date('2016');
const MockDate = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = MockDate.UTC;
global.Date.parse = MockDate.parse;
global.Date.now = MockDate.now;

it('should return initialState', () => {
  const takeAction = {
    type: FETCH_GET_MEMBER,
  };
  expect(fetchReducer(undefined, takeAction)).toEqual(
    Map({
      isLoading: false,
      isError: false,
    })
  );
});

it('should handle request action', () => {
  const requestAction = {
    type: FETCH_GET_MEMBER_REQUEST,
  };
  expect(fetchReducer(undefined, requestAction)).toEqual(
    Map({
      isLoading: true,
      isError: false,
    })
  );
});

it('should handle cancel action', () => {
  const cancelAction = {
    type: FETCH_GET_MEMBER_CANCEL,
  };
  expect(fetchReducer(undefined, cancelAction)).toEqual(
    Map({
      isLoading: false,
      isError: false,
    })
  );
});

it('should handle success action', () => {
  const successAction = {
    type: FETCH_GET_MEMBER_SUCCESS,
    payload: Map({
      foo: 'bar',
    }),
  };
  expect(fetchReducer(undefined, successAction)).toEqual(
    Map({
      isLoading: false,
      isError: false,
      latestUpdated: new Date().getTime(),
      data: Map({
        foo: 'bar',
      }),
    })
  );
});

it('should handle failure action', () => {
  const failureAction = {
    type: FETCH_GET_MEMBER_FAILURE,
    payload: new Error(),
  };
  expect(fetchReducer(undefined, failureAction)).toEqual(
    Map({
      isLoading: false,
      isError: true,
      error: new Error(),
    })
  );
});
