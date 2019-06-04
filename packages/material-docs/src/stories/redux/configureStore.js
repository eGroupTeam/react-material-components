import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import { reducer as formReducer } from 'redux-form/immutable';
import { composeWithDevTools } from 'redux-devtools-extension';

// create store
export const store = createStore(
  combineReducers({
    form: formReducer
  }),
  composeWithDevTools()
);
