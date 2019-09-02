import React from 'react';
import PropTypes from 'prop-types';
import useGetVideoSnapshot from './useGetVideoSnapshot';

let interval;

/**
 * Use MediaStream to extends video and get screenshot interval when streaming open.
 */
const MediaStreamClipper = ({
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
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(stream => {
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
      })
      .catch(e => {});
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
    // set data to empty
    interval = setInterval(async () => {
      const blob = await getVideoSnapshot('image/jpeg', quality);
      if (!blob) {
        clearInterval(interval);
        return;
      }
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
    <video ref={videoEl} onPlay={handlePlay} onPause={handlePause} {...other} />
  );
};

MediaStreamClipper.propTypes = {
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
  onPlay: PropTypes.func,
  onPause: PropTypes.func
};

MediaStreamClipper.defaultProps = {
  facingMode: 'user',
  intervalTime: 200,
  quality: 0.8
};

export default MediaStreamClipper;
