import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

function calcPaddingTop(ratio) {
  const array = ratio.split(':');
  const denominator = parseInt(array[0], 10);
  const numerator = parseInt(array[1], 10);
  return `${(numerator / denominator) * 100}%`;
}

const styles = theme => ({
  root: {
    position: 'relative',
    paddingTop: props => calcPaddingTop(props.ratio)
  },
  imgContainer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: 'absolute',
    overflow: 'hidden'
  },
  useObjectFit: {
    width: '100%',
    objectFit: props => props.fit
  },
  fixedObjectFit: {
    width: '100%',
    height: '100%',
    backgroundImage: props => `url(${props.src})`,
    backgroundSize: props => props.fit,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
});

// TODO: Need to fixed forwardRef
const RatioImage = ({ classes, className, ratio, src, fit, ...other }) => {
  const rootEl = React.useRef();
  const [height, setHeight] = React.useState();
  const supportObjectFit = !(
    document.documentElement.style.objectFit === undefined ||
    'objectFit' in document.documentElement.style === false
  );

  React.useEffect(() => {
    setHeight(rootEl.current.offsetHeight);
  }, []);

  React.useEffect(() => {
    function handleResize() {
      setHeight(rootEl.current.offsetHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderContent = () => {
    if (supportObjectFit) {
      return (
        // eslint-disable-next-line jsx-a11y/alt-text
        <img
          height={height}
          className={classes.useObjectFit}
          src={src}
          {...other}
        />
      );
    }
    return <div className={classes.fixedObjectFit} {...other} />;
  };

  return (
    <div ref={rootEl} className={clsx(className, classes.root)}>
      <div className={classes.imgContainer}>{renderContent()}</div>
    </div>
  );
};

RatioImage.propTypes = {
  /**
   * Image src.
   */
  src: PropTypes.string.isRequired,
  /**
   * Image object fit.
   */
  fit: PropTypes.string.isRequired,
  /**
   * Image ratio
   */
  ratio: PropTypes.string.isRequired
};

RatioImage.defaultProps = {
  fit: 'contain'
};

export default withStyles(styles)(RatioImage);
