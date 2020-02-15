import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';

import useGetVideoSnapshot from './useGetVideoSnapshot';

const styles = theme => ({
  mirrored: {
    transform: 'rotateY(180deg)'
  }
});

let interval;
/**
 * Use MediaStream to extends video and get screenshot interval when streaming open.
 */
const MediaStreamClipper = ({
  classes,
  className,
  facingMode,
  onPlay,
  onPause,
  onTimeout,
  isStop,
  intervalTime,
  timeout,
  quality,
  handleGetIntervalShot,
  mirrored,
  ...other
}) => {
  const [getVideoSnapshot, videoEl] = useGetVideoSnapshot({ mirrored });

  React.useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    let constraints = {
      audio: false,
      video: {
        facingMode
      }
    };
    try {
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        // Older browsers may not have srcObject
        if ('srcObject' in videoEl.current) {
          videoEl.current.srcObject = stream;
        } else {
          // Avoid using this in new browsers, as it is going away.
          videoEl.current.src = window.URL.createObjectURL(stream);
        }
        videoEl.current.onloadedmetadata = function(e) {
          videoEl.current.play();
        };
      });
    } catch (error) {
      console.error(error);
    }
  }, [facingMode, videoEl]);

  const handlePlay = e => {
    if (timeout) {
      setTimeout(() => {
        videoEl.current.pause();
        if (onTimeout) {
          onTimeout();
        }
      }, timeout);
    }
    if (typeof interval !== 'undefined') {
      clearInterval(interval);
    }
    // set data to empty
    interval = setInterval(async () => {
      const blob = await getVideoSnapshot('image/jpeg', quality);
      if (!blob) return;
      if (handleGetIntervalShot) {
        handleGetIntervalShot(blob);
      }
    }, intervalTime);
    if (onPlay) {
      onPlay(e);
    }
  };

  const handlePause = e => {
    clearInterval(interval);
    if (onPause) {
      onPause(e);
    }
  };

  return (
    <video
      className={clsx(className, {
        [classes.mirrored]: mirrored
      })}
      ref={videoEl}
      onPlay={handlePlay}
      onPause={handlePause}
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
  onPlay: PropTypes.func,
  onPause: PropTypes.func
};

MediaStreamClipper.defaultProps = {
  facingMode: 'user',
  intervalTime: 200,
  quality: 0.8
};

export default withStyles(styles)(MediaStreamClipper);
