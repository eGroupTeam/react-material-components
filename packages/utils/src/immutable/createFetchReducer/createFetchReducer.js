import { handleActions } from 'redux-actions';
import { Map } from '@e-group/immutable';

/**
 * @private
 * @param {*} success
 */
function makeSuccessAction(success) {
  const hasConfig = Array.isArray(success);
  const type = hasConfig ? success[0] : success;
  const config = hasConfig ? success[1] : {};
  const { setData } = config;
  return {
    [type]: (state, action) => {
      let newState = state.set('isLoading', false);
      newState = newState.set('latestUpdated', new Date().getTime());
      if (typeof action.payload === 'undefined') {
        return newState;
      }
      if (setData) {
        newState = setData(newState, action);
      } else {
        newState = newState.set('data', action.payload);
      }
      return newState;
    },
  };
}

/**
 * @private
 * @param {*} cancel
 */
function makeCancelAction(cancel) {
  const cancelState = !cancel
    ? {}
    : {
        [cancel]: (state) => state.set('isLoading', false),
      };
  return cancelState;
}

/**
 * To handle process of fetch actions
 * @private
 * @param {Object|null} config
 * @return {Object}
 */
function makeFetchActions({ take, request, success, cancel, failure }) {
  return {
    [take]: (state) => state.set('isError', false),
    [request]: (state) => state.set('isLoading', true),
    ...makeSuccessAction(success),
    ...makeCancelAction(cancel),
    [failure]: (state, action) => {
      let newState = state.set('isLoading', false);
      newState = newState.set('isError', true);
      if (action.payload) {
        newState = newState.set('error', action.payload);
      }
      return newState;
    },
  };
}

/**
 * @private
 * @param {*} config
 */
function checkConfig(config) {
  if (!config) {
    throw new Error("Config is required but it's undefined.");
  } else {
    const { take, request, success, failure } = config;
    if (!take) throw new Error("Config take is required but it's undefined.");
    if (!request)
      throw new Error("Config request is required but it's undefined.");
    if (!success)
      throw new Error("Config success is required but it's undefined.");
    if (!failure)
      throw new Error("Config failure is required but it's undefined.");
  }
}

/**
 * create fetch reducer by config,
 * First arg is the config
 * Second arg can replace the initialState you need
 * Third arg can replace the action function you need
 * @param {Object} config
 * @param {Object|null} cusInitialState
 * @param {Object|null} cusActions
 */
export default function createFetchReducer(
  config,
  cusInitialState,
  cusActions
) {
  checkConfig(config);
  const actions = makeFetchActions(config);
  const initialState = Map({
    isLoading: false,
    isError: false,
  });
  return handleActions(
    {
      ...actions,
      ...cusActions,
    },
    initialState.merge(cusInitialState)
  );
}
