import React from 'react';
import PropTypes from 'prop-types';

import useInterval from '@e-group/hooks/useInterval';
import useTimeout from '@e-group/hooks/useTimeout';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import useGetVideoSnapshot from './useGetVideoSnapshot';

const styles = theme => ({
  mirrored: {
    transform: 'rotateY(180deg)'
  }
});

/**
 * Use MediaStream to extends video and get screenshot interval when streaming open.
 */
const MediaStreamClipper = ({
  classes,
  className,
  facingMode,
  onPlay,
  onTimeout,
  onGetUserMediaFulfilled,
  onGetUserMediaRejected,
  onGetUserMediaError,
  isStop,
  intervalTime,
  timeout,
  quality,
  handleGetIntervalShot,
  mirrored,
  ...other
}) => {
  const videoEl = React.useRef(null);
  const [getVideoSnapshot] = useGetVideoSnapshot(videoEl, { mirrored });

  const handleTimeout = () => {
    if (typeof timeout !== 'number') return;
    if (videoEl.current) {
      videoEl.current.pause();
    }
    if (onTimeout) {
      onTimeout();
    }
  };

  const [, , reset] = useTimeout(handleTimeout, timeout);

  useInterval(async () => {
    const blob = await getVideoSnapshot('image/jpeg', quality);
    if (!blob) return;
    if (handleGetIntervalShot) {
      handleGetIntervalShot(blob);
    }
  }, intervalTime);

  React.useEffect(() => {
    const constraints = {
      audio: false,
      video: {
        facingMode
      }
    };
    const onfulfilled = stream => {
      if (onGetUserMediaFulfilled) {
        onGetUserMediaFulfilled(videoEl.current);
      }
      // Older browsers may not have srcObject
      if ('srcObject' in videoEl.current) {
        videoEl.current.srcObject = stream;
      } else {
        // Avoid using this in new browsers, as it is going away.
        videoEl.current.src = window.URL.createObjectURL(stream);
      }
    };
    const onrejected = reason => {
      if (onGetUserMediaRejected) {
        onGetUserMediaRejected(reason);
      }
    };
    try {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(onfulfilled, onrejected);
    } catch (error) {
      if (onGetUserMediaError) {
        onGetUserMediaError(error);
      }
    }
  }, [
    facingMode,
    onGetUserMediaError,
    onGetUserMediaFulfilled,
    onGetUserMediaRejected
  ]);

  const handlePlay = e => {
    reset();
    if (onPlay) {
      onPlay(e);
    }
  };

  return (
    <video
      className={clsx(className, {
        [classes.mirrored]: mirrored
      })}
      ref={videoEl}
      onPlay={handlePlay}
      {...other}
    />
  );
};

MediaStreamClipper.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * To defined facingMode default is `user`.
   */
  facingMode: PropTypes.string.isRequired,
  /**
   * Set interval get screenshot time default is `200`.
   */
  intervalTime: PropTypes.number.isRequired,
  /**
   * Set shapshot quality.
   */
  quality: PropTypes.number.isRequired,
  /**
   * Set timeout to pause streaming.
   */
  timeout: PropTypes.number,
  /**
   * Handle after timeout.
   */
  onTimeout: PropTypes.func,
  /**
   * Handle after get user media fulfilled.
   */
  onGetUserMediaFulfilled: PropTypes.func,
  /**
   * Handle after get user media rejected.
   */
  onGetUserMediaRejected: PropTypes.func,
  /**
   * Handle after get user media error.
   */
  onGetUserMediaError: PropTypes.func,
  /**
   * Handle interval get screenshot when video play.
   */
  handleGetIntervalShot: PropTypes.func,
  /**
   * Set `true` to get a mirrored version of the video stream.
   */
  mirrored: PropTypes.bool,
  /**
   * JSX Attribute.
   */
  className: PropTypes.string,
  onPlay: PropTypes.func
};

MediaStreamClipper.defaultProps = {
  facingMode: 'user',
  intervalTime: 200,
  quality: 0.8
};

export default withStyles(styles)(MediaStreamClipper);
