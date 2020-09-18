import {
  INITIALIZE_DIALOG,
  OPEN_DIALOG,
  CLOSE_DIALOG,
  SET_DIALOG_DATA,
} from './types';
import {
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogData,
} from './actions';

const name = 'alertAialog';

describe('dialog actions', () => {
  it('should create an action to initialize dialog', () => {
    const expectedAction = {
      type: INITIALIZE_DIALOG,
      payload: name,
    };
    expect(initializeDialog(name)).toEqual(expectedAction);
  });

  it('should create an action to open dialog', () => {
    const expectedAction = {
      type: OPEN_DIALOG,
      payload: name,
    };
    expect(openDialog(name)).toEqual(expectedAction);
  });

  it('should create an action to close dialog', () => {
    const expectedAction = {
      type: CLOSE_DIALOG,
      payload: name,
    };
    expect(closeDialog(name)).toEqual(expectedAction);
  });

  it('should create an action to set dialog data', () => {
    const data = {
      message: 'message',
      title: 'title',
    };
    const expectedAction = {
      type: SET_DIALOG_DATA,
      payload: data,
    };
    expect(setDialogData(data)).toEqual(expectedAction);
  });
});
