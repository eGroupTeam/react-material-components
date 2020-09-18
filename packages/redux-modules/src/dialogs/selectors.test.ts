import { getDialogStates } from './selectors';

const name = 'alertAialog';

describe('dialog selectors', () => {
  it('should get default dialog states when dialog is undefined.', () => {
    expect(getDialogStates({}, null, name)).toEqual({
      isOpen: false,
    });
  });

  const dialogStates = {
    isOpen: false,
    message: 'message',
    title: 'title',
  };
  const state = {
    dialogs: {
      [name]: dialogStates,
    },
  };
  it('should get dialog states by dialog name', () => {
    expect(getDialogStates(state, null, name)).toEqual(dialogStates);
  });
});
