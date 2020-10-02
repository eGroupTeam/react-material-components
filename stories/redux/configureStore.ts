import { createStore, combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';
import { snackbars } from '@e-group/redux-modules/snackbars';
import { composeWithDevTools } from 'redux-devtools-extension';

// create store
export const store = createStore(
  combineReducers({
    form: formReducer,
    snackbars,
  }),
  composeWithDevTools()
);
