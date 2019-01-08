import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { fromJS } from 'immutable';

// initialState
const initialState = fromJS();

// create store
export const store = createStore(
  combineReducers({
    form: formReducer
  }),
  initialState,
  // chrome develop extension
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
