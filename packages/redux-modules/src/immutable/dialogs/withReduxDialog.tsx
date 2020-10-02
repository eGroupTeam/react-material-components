import React, {
  ComponentType,
  forwardRef,
  PropsWithChildren,
  MutableRefObject,
  FC,
  useEffect,
} from 'react';
import { connect, MapDispatchToProps } from 'react-redux';

import { initializeDialog, closeDialog } from '../../dialogs/actions';
import { getDialogStates } from './selectors';

interface OwnProps {
  handleClose?: () => void;
}

interface DispatchProps {
  initializeDialog: (name: string) => void;
  closeDialog: (name: string) => void;
  handleClose: () => void;
}

interface StateProps {
  isOpen: boolean;
}

export type WithReduxDialogProps = StateProps & DispatchProps & OwnProps;

/**
 * Please read this article for more info.
 * https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
 * @param name
 */
const withReduxDialog = (name: string) => <T, OriginalProps>(
  WrappedComponent: ComponentType<any | string>
) => {
  type ForwardedRef =
    | ((instance: T | null) => void)
    | MutableRefObject<T | null>
    | null;
  type PrivateProps = { forwardedRef: ForwardedRef };

  type Props = WithReduxDialogProps & PrivateProps;

  const WithReduxDialog: FC<Props> = (props) => {
    const { forwardedRef, initializeDialog, closeDialog, ...other } = props;

    useEffect(() => {
      initializeDialog(name);
    }, []);

    return <WrappedComponent ref={forwardedRef} {...other} />;
  };

  /**
   * Connect before forwardRef
   * https://github.com/reduxjs/react-redux/issues/914
   */
  const mapStateToProps = (state: unknown, ownProps: OwnProps): StateProps => ({
    ...getDialogStates(state, ownProps, name).toJS(),
  });

  const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch
  ) => ({
    initializeDialog: (name) => dispatch(initializeDialog(name)),
    closeDialog: (name) => dispatch(closeDialog(name)),
    handleClose: () => {
      dispatch(closeDialog(name));
    },
  });

  const ConnectedComponent = connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxDialog);

  /**
   * Forwarding refs in higher-order components
   * https://reactjs.org/docs/forwarding-refs.html#forwarding-refs-in-higher-order-components
   */
  function RefForwardingFactory(
    props: PropsWithChildren<OriginalProps>,
    ref: ForwardedRef
  ) {
    return <ConnectedComponent {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const componentName = WrappedComponent.displayName || WrappedComponent.name;
  RefForwardingFactory.displayName = `withReduxDialog(${componentName})`;

  return forwardRef<T, OriginalProps>(RefForwardingFactory);
};

export default withReduxDialog;
