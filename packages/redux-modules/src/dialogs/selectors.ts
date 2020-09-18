import getIn from '@e-group/utils/getIn';

export const getDialogStates = (state: any, props: any, name: string) =>
  getIn(state, ['dialogs', name], {
    isOpen: false,
  });
