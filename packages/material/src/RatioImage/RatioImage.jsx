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
  container: {
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

const RatioImage = React.forwardRef(function RatioImage(props, ref) {
  const { classes, className, ratio, src, fit, ...other } = props;
  const [height, setHeight] = React.useState();
  const supportObjectFit = !(
    document.documentElement.style.objectFit === undefined ||
    'objectFit' in document.documentElement.style === false
  );
  const defaultRef = React.useRef();
  const elementRef = ref || defaultRef;

  React.useEffect(() => {
    setHeight(elementRef.current.offsetHeight);
  }, [elementRef]);

  React.useEffect(() => {
    function handleResize() {
      setHeight(elementRef.current.offsetHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [elementRef]);

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
    <div ref={elementRef} className={clsx(className, classes.root)}>
      <div className={classes.container}>{renderContent()}</div>
    </div>
  );
});

RatioImage.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
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
