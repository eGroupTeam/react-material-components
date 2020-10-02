import React, { FC } from 'react';
import { Meta } from '@storybook/react';

import { Provider, useDispatch } from 'react-redux';
import Snackbar from '@e-group/material-lab/Snackbar';
import {
  openSnackbar,
  withReduxSnackbar,
} from '@e-group/redux-modules/snackbars';
import { Button } from '@material-ui/core';
import { store } from '../redux/configureStore';

export default {
  title: 'Lab/Snackbar',
  component: Snackbar,
  argTypes: {
    message: { control: 'text', defaultValue: 'Message' },
    isOpen: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
    onCloseClick: { action: 'clicked' },
    autoHideDuration: { control: 'number', defaultValue: 2000 },
    anchorOrigin: {
      control: 'object',
      defaultValue: {
        vertical: 'top',
        horizontal: 'center',
      },
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['default', 'warning', 'info', 'success', 'error'],
      },
      defaultValue: 'default',
    },
  },
} as Meta;

export const Default: FC = (args) => <Snackbar {...args} />;

interface ReduxSnackbarProps {
  message: string;
}
const reduxSnackbar = 'reduxSnackbar';
const ReduxSnackbar = withReduxSnackbar(reduxSnackbar)<any, ReduxSnackbarProps>(
  Snackbar
);
const OpenButton = () => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(openSnackbar(reduxSnackbar))}>
      OPEN SNACKBAR
    </Button>
  );
};
export const WithReduxSnackbar: FC = ({ children, ...args }) => (
  <Provider store={store}>
    <OpenButton />
    <ReduxSnackbar message={(args as any).message} />
  </Provider>
);
