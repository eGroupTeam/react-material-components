import { getSnackbarStates } from './selectors';

const name = 'globalSnackbar';

describe('snackbar selectors', () => {
  const snackbarStates = {
    isOpen: false,
    message: 'message',
    title: 'title',
  };
  const state = {
    snackbars: {
      [name]: snackbarStates,
    },
  };
  it('should get snackbar states by snackbar name', () => {
    expect(getSnackbarStates(state, null, name)).toEqual(snackbarStates);
  });
});
