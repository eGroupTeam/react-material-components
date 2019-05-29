import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import CircularProgress from '@material-ui/core/CircularProgress';

export const styles = {
  '@global': {
    html: {
      height: '100%'
    },
    body: {
      height: '100%'
    }
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: props => props.alignItems,
    height: props => props.height
  }
};

const useStyles = makeStyles(styles);

const Loader = props => {
  const {
    className: classNameProp,
    component: Loader,
    alignItems,
    height,
    MuiLoaderProps,
    ...others
  } = props;
  const classes = useStyles(props);
  const className = clsx(classes.root, classNameProp);
  return (
    <div className={className} {...others}>
      <Loader {...MuiLoaderProps} />
    </div>
  );
};

Loader.propTypes = {
  /**
   * JSX attribute
   */
  className: PropTypes.string,
  /**
   * The loader component.
   * Either a string to use a DOM element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Default loader component is Mui's CircularProgress component
   * Please read [official doc](https://material-ui.com/api/circular-progress/)
   */
  MuiLoaderProps: PropTypes.object,
  /**
   * Defined the loader position.
   * enum: 'stretch' | 'center'
   */
  alignItems: PropTypes.string,
  /**
   * Defined the container height.
   * Generally if we want vertical center `Loader` just set height='100%' and alignItems='center'.
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Loader.defaultProps = {
  component: CircularProgress,
  alignItems: 'stretch'
};

export default Loader;
