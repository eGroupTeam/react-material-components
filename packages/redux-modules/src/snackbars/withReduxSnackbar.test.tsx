import React, { createRef, forwardRef } from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import withReduxSnackbar, { WithReduxSnackbarProps } from './withReduxSnackbar';

let store;
const name = 'globalSnackbar';

interface MockSnackbarProps extends WithReduxSnackbarProps {
  title: string;
  message: string;
}

const MockSnackbar = forwardRef<HTMLDivElement, MockSnackbarProps>(
  (props, ref) => {
    const { isOpen, title, handleClose, message } = props;
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

describe('Redux Snackbar HOC', () => {
  beforeEach(() => {
    const mockStore = configureStore();

    store = mockStore({
      snackbars: {
        [name]: {
          isOpen: true,
          title: 'snackbar title',
          message: 'snackbar message',
        },
      },
    });
  });
  it('Should render the component only when snackbar prop is true', () => {
    const ReduxSnackbar = withReduxSnackbar(name)<
      HTMLDivElement,
      {
        store: any;
      }
    >(MockSnackbar);
    const { getByText } = render(<ReduxSnackbar store={store} />);
    expect(getByText('true')).toBeInTheDocument();
    expect(getByText('snackbar title')).toBeInTheDocument();
    expect(getByText('snackbar message')).toBeInTheDocument();
  });
  it('Should pass ref to Snackbar component', () => {
    const ReduxSnackbar = withReduxSnackbar(name)<
      HTMLDivElement,
      {
        store: any;
      }
    >(MockSnackbar);
    const ref = createRef<HTMLDivElement>();
    render(<ReduxSnackbar ref={ref} store={store} />);
    expect(ref.current).not.toBeNull();
  });
});
