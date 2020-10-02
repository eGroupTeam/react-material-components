import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import AlertDialog from '@e-group/material-module/AlertDialog';
import { withReduxDialog, openDialog } from '@e-group/redux-modules/dialogs';
import { Provider, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { store } from '../redux/configureStore';

export default {
  title: 'Modules/AlertDialog',
  component: AlertDialog,
  argTypes: {
    primary: { control: 'text', defaultValue: 'Title' },
    message: { control: 'text', defaultValue: 'Message' },
    isOpen: { control: 'boolean', defaultValue: true },
    fullWidth: { control: 'boolean', defaultValue: true },
    onClose: { action: 'closed' },
  },
} as Meta;

export const Default: FC = (args) => <AlertDialog {...args} />;

interface ReduxDialogProps {
  message: string;
}
const reduxDialog = 'reduxDialog';
const ReduxDialog = withReduxDialog(reduxDialog)<any, ReduxDialogProps>(
  AlertDialog
);
const OpenButton = () => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(openDialog(reduxDialog))}>
      OPEN DIALOG
    </Button>
  );
};
export const WithReduxDialog: FC = ({ children, ...args }) => (
  <Provider store={store}>
    <OpenButton />
    <ReduxDialog message={(args as any).message} />
  </Provider>
);
