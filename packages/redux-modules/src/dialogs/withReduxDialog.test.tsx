import React, { createRef, forwardRef } from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import withReduxDialog, { WithReduxDialogProps } from './withReduxDialog';

let store;
const name = 'alertAialog';

interface MockDialogProps extends WithReduxDialogProps {
  title: string;
  message: string;
}

const MockDialog = forwardRef<HTMLDivElement, MockDialogProps>(
  (props, ref) => {
    const { isOpen, handleClose, title, message } = props;
    return (
      <div ref={ref}>
        <p>{String(isOpen)}</p>
        <p>{title}</p>
        <p>{message}</p>
        <button onClick={handleClose}>close</button>
      </div>
    );
  }
);

describe('Redux Dialog HOC', () => {
  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore({
      dialogs: {
        [name]: {
          isOpen: true,
          title: 'dialog title',
          message: 'dialog message',
        },
      },
    });
  });
  it('Should render the component only when dialog prop is true', () => {
    const ReduxDialog = withReduxDialog(name)<
      HTMLDivElement,
      {
        store: any;
      }
    >(MockDialog);
    const { getByText } = render(<ReduxDialog store={store} />);
    expect(getByText('true')).toBeInTheDocument();
    expect(getByText('dialog title')).toBeInTheDocument();
    expect(getByText('dialog message')).toBeInTheDocument();
  });
  it('Should pass ref to Dialog component', () => {
    const ReduxDialog = withReduxDialog(name)<
      HTMLDivElement,
      {
        store: any;
      }
    >(MockDialog);
    const ref = createRef<HTMLDivElement>();
    render(<ReduxDialog ref={ref} store={store} />);
    expect(ref.current).not.toBeNull();
  });
});
