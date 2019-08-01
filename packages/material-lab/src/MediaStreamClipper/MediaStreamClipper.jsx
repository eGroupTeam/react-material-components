import React from 'react';
import PropTypes from 'prop-types';
import Video from '../Video';

let interval;

/**
 * Use MediaStream to extends `Video` component and get screenshot interval when streaming open.
 */
const MediaStreamClipper = ({
  facingMode,
  onPlay,
  onPause,
  onTimeoutPause,
  isStop,
  intervalTime,
  timeout,
  handleGetIntervalShot,
  ...other
}) => {
  const videoEl = React.useRef(null);

  React.useEffect(() => {
    document.body.classList.add('hide-scroll-bar');
    return () => {
      document.body.classList.remove('hide-scroll-bar');
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
  }, [facingMode]);

  const handlePlay = (e, { getScreenshot }) => {
    if (timeout) {
      setTimeout(() => {
        videoEl.current.pause();
        onTimeoutPause();
      }, timeout);
    }
    // set data to empty
    interval = setInterval(async () => {
      const blob = await getScreenshot('image/jpeg', 0.8);
      if (!blob) {
        clearInterval(interval);
        return;
      }
      if (handleGetIntervalShot) {
        handleGetIntervalShot(blob);
      }

      // stop process
      if (isStop) {
        clearInterval(interval);
      }
    }, intervalTime);
    if (onPlay) {
      onPlay(e, { getScreenshot });
    }
  };

  const handlePause = () => {
    clearInterval(interval);
    if (onPause) {
      onPause();
    }
  };

  return (
    <Video ref={videoEl} onPlay={handlePlay} onPause={handlePause} {...other} />
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
   * Set timeout to stop screenshot.
   */
  timeout: PropTypes.number,
  /**
   * Handle after timeout paused.
   */
  onTimeoutPause: PropTypes.func,
  /**
   * Handle interval get screenshot when video play.
   */
  handleGetIntervalShot: PropTypes.func,
  /**
   * Set `true` to stop interval get screenshot.
   */
  isStop: PropTypes.bool,
  /**
   * JSX Attribute.
   */
  onPlay: PropTypes.func,
  onPause: PropTypes.func
};

MediaStreamClipper.defaultProps = {
  facingMode: 'user',
  intervalTime: 200
};

export default MediaStreamClipper;
