import { fromJS, Map } from 'immutable';

import {
  initializeSnackbar,
  openSnackbar,
  closeSnackbar,
  setSnackbarData,
} from '../../snackbars';
import { snackbars as reducer } from './snackbars';

const name = 'globalSnackbar';

describe('snackbar reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '', payload: Map({}) })).toEqual(
      fromJS({})
    );
  });

  it('should handle INITIALIZE_SNACKBAR', () => {
    const state = fromJS({});
    const initializeState = fromJS({
      [name]: {
        isOpen: false,
      },
    });
    expect(reducer(state, initializeSnackbar(name))).toEqual(initializeState);
    expect(reducer(state, initializeSnackbar())).toEqual(state);
    expect(reducer(initializeState, initializeSnackbar(name))).toEqual(
      initializeState
    );
  });

  it('should handle OPEN_SNACKBAR', () => {
    const state = fromJS({
      [name]: {
        isOpen: false,
      },
    });
    expect(reducer(state, openSnackbar(name))).toEqual(
      fromJS({
        [name]: {
          isOpen: true,
        },
      })
    );
    expect(reducer(state, openSnackbar())).toEqual(state);
  });

  it('should handle CLOSE_SNACKBAR', () => {
    const state = fromJS({
      [name]: {
        isOpen: true,
      },
    });
    expect(reducer(state, closeSnackbar(name))).toEqual(
      fromJS({
        [name]: {
          isOpen: false,
        },
      })
    );
    expect(reducer(state, closeSnackbar())).toEqual(state);
  });

  it('should handle SET_SNACKBAR_DATA', () => {
    const state = fromJS({
      [name]: {
        isOpen: false,
      },
    });
    expect(
      reducer(
        state,
        setSnackbarData({
          name,
          message: 'message',
          title: 'title',
        })
      )
    ).toEqual(
      fromJS({
        [name]: {
          isOpen: false,
          message: 'message',
          title: 'title',
        },
      })
    );
    expect(reducer(state, setSnackbarData())).toEqual(state);
    expect(
      reducer(
        fromJS({}),
        setSnackbarData({
          name,
        })
      )
    ).toEqual(fromJS({}));
  });
});
