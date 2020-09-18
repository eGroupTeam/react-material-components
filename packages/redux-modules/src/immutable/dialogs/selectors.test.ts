import { fromJS } from 'immutable';
import { getDialogStates } from './selectors';

const name = 'alertAialog';

describe('dialog selectors', () => {
  it('should get default dialog states when dialog is undefined.', () => {
    expect(getDialogStates(fromJS({}), null, name)).toEqual(
      fromJS({
        isOpen: false,
      })
    );
  });

  const dialogStates = fromJS({
    isOpen: false,
    message: 'message',
    title: 'title',
  });
  const state = fromJS({
    dialogs: {
      [name]: dialogStates,
    },
  });
  it('should get dialog states by dialog name', () => {
    expect(getDialogStates(state, null, name)).toEqual(dialogStates);
  });
});
