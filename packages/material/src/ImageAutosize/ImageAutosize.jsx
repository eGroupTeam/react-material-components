import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    overflow: 'hidden'
  },
  img: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%'
  }
}));

function calcPaddingTop(ratio) {
  const array = ratio.split(':');
  const denominator = parseInt(array[0], 10);
  const numerator = parseInt(array[1], 10);
  return `${(numerator / denominator) * 100}%`;
}

const ImageAutosize = ({ className: classNameProps, ratio, ...other }) => {
  const classes = useStyles();
  const className = classNames(classes.img, classNameProps);
  return (
    <div className={classes.root} style={{ paddingTop: calcPaddingTop(ratio) }}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img className={className} {...other} />
    </div>
  );
};

ImageAutosize.propTypes = {
  /**
   * Customized Image ratio.
   */
  ratio: PropTypes.string
};

ImageAutosize.defaultProps = {
  ratio: '16:9'
};

export default ImageAutosize;
