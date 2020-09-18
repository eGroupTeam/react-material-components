import getIn from '@e-group/utils/getIn';

export const getSnackbarStates = (state: any, props: any, name: string) =>
  getIn(state, ['snackbars', name], {});
