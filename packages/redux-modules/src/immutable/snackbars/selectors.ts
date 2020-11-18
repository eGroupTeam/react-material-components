import { Map } from '@e-group/immutable';

export const getSnackbarStates = (state: any, props: any, name: string) =>
  state.getIn(['snackbars', name], Map());
