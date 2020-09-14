import { createStore, combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { composeWithDevTools } from 'redux-devtools-extension';

// create store
export const store = createStore(
  combineReducers({
    form: formReducer,
  }),
  composeWithDevTools()
);
