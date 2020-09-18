import {
  INITIALIZE_SNACKBAR,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  SET_SNACKBAR_DATA,
} from './types';
import {
  initializeSnackbar,
  openSnackbar,
  closeSnackbar,
  setSnackbarData,
} from './actions';

const name = 'globalSnackbar';

describe('snackbar actions', () => {
  it('should create an action to initialize snackbar', () => {
    const expectedAction = {
      type: INITIALIZE_SNACKBAR,
      payload: name,
    };
    expect(initializeSnackbar(name)).toEqual(expectedAction);
  });

  it('should create an action to open snackbar', () => {
    const expectedAction = {
      type: OPEN_SNACKBAR,
      payload: name,
    };
    expect(openSnackbar(name)).toEqual(expectedAction);
  });

  it('should create an action to close snackbar', () => {
    const expectedAction = {
      type: CLOSE_SNACKBAR,
      payload: name,
    };
    expect(closeSnackbar(name)).toEqual(expectedAction);
  });

  it('should create an action to set snackbar data', () => {
    const data = {
      message: 'message',
      title: 'title',
    };
    const expectedAction = {
      type: SET_SNACKBAR_DATA,
      payload: data,
    };
    expect(setSnackbarData(data)).toEqual(expectedAction);
  });
});
