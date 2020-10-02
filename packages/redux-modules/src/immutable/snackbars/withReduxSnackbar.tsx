import React, {
  ComponentType,
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  useEffect,
  FC,
} from 'react';
import { connect, MapDispatchToProps } from 'react-redux';

import { initializeSnackbar, closeSnackbar } from '../../snackbars/actions';
import { getSnackbarStates } from './selectors';

interface OwnProps {
  handleClose?: () => void;
}

interface DispatchProps {
  initializeSnackbar: (name: string) => void;
  closeSnackbar: (name: string) => void;
  handleClose: () => void;
}

interface StateProps {
  isOpen: boolean;
}

export type WithReduxSnackbarProps = StateProps & DispatchProps & OwnProps;

/**
 * Please read this article for more info.
 * https://medium.com/@martin_hotell/react-refs-with-typescript-a32d56c4d315
 * @param name
 */
const withReduxSnackbar = (name: string) => <T, OriginalProps>(
  WrappedComponent: ComponentType<any | string>
) => {
  type ForwardedRef =
    | ((instance: T | null) => void)
    | MutableRefObject<T | null>
    | null;
  type PrivateProps = { forwardedRef: ForwardedRef };

  type Props = WithReduxSnackbarProps & PrivateProps;

  const WithReduxSnackbar: FC<Props> = (props) => {
    const { forwardedRef, initializeSnackbar, closeSnackbar, ...other } = props;

    useEffect(() => {
      initializeSnackbar(name);
    }, []);

    return <WrappedComponent ref={forwardedRef} {...other} />;
  };

  /**
   * Connect before forwardRef
   * https://github.com/reduxjs/react-redux/issues/914
   */
  const mapStateToProps = (state: unknown, ownProps: OwnProps): StateProps => ({
    ...getSnackbarStates(state, ownProps, name).toJS(),
  });

  const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = (
    dispatch,
    ownProps
  ) => ({
    initializeSnackbar: (name) => dispatch(initializeSnackbar(name)),
    closeSnackbar: (name) => dispatch(closeSnackbar(name)),
    handleClose: () => {
      if (ownProps.handleClose) {
        ownProps.handleClose();
      } else {
        dispatch(closeSnackbar(name));
      }
    },
  });

  const ConnectedComponent = connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(WithReduxSnackbar);

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
  RefForwardingFactory.displayName = `withReduxSnackbar(${componentName})`;

  return forwardRef<T, OriginalProps>(RefForwardingFactory);
};

export default withReduxSnackbar;
