import { fromJS, Map } from 'immutable';
import {
  initializeDialog,
  openDialog,
  closeDialog,
  setDialogData,
} from '../../dialogs';
import { dialogs as reducer } from './dialogs';

const name = 'alertAialog';

describe('dialog reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '', payload: Map({}) })).toEqual(
      fromJS({})
    );
  });

  it('should handle INITIALIZE_DIALOG', () => {
    const state = fromJS({});
    const initializeState = fromJS({
      [name]: {
        isOpen: false,
      },
    });
    expect(reducer(state, initializeDialog(name))).toEqual(initializeState);
    expect(reducer(state, initializeDialog())).toEqual(state);
    expect(reducer(initializeState, initializeDialog(name))).toEqual(
      initializeState
    );
  });

  it('should handle OPEN_DIALOG', () => {
    const state = fromJS({
      [name]: {
        isOpen: false,
      },
    });
    expect(reducer(state, openDialog(name))).toEqual(
      fromJS({
        [name]: {
          isOpen: true,
        },
      })
    );
    expect(reducer(state, openDialog())).toEqual(state);
  });

  it('should handle CLOSE_DIALOG', () => {
    const state = fromJS({
      [name]: {
        isOpen: true,
      },
    });
    expect(reducer(state, closeDialog(name))).toEqual(
      fromJS({
        [name]: {
          isOpen: false,
        },
      })
    );
    expect(reducer(state, closeDialog())).toEqual(state);
  });

  it('should handle SET_DIALOG_DATA', () => {
    const state = fromJS({
      [name]: {
        isOpen: false,
      },
    });
    expect(
      reducer(
        state,
        setDialogData({
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
    expect(reducer(state, setDialogData())).toEqual(state);
    expect(
      reducer(
        fromJS({}),
        setDialogData({
          name,
        })
      )
    ).toEqual(fromJS({}));
  });
});
