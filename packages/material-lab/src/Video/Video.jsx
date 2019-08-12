import React from 'react';
import PropTypes from 'prop-types';

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(resolve, type, quality);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * A video component to get screenshot and implementation play function
 */
const Video = React.forwardRef(({ onPlay, ...other }, ref) => {
  const canvas = document.createElement('canvas');

  const getScreenshot = async (type, quality) => {
    if (!ref.current) {
      return undefined;
    }
    canvas.width = ref.current.videoWidth;
    canvas.height = ref.current.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(ref.current, 0, 0);
    return await canvasToBlob(canvas, type, quality);
  };

  const handlePlay = e => {
    if (onPlay) {
      onPlay(e, { getScreenshot });
    }
  };

  return <video ref={ref} onPlay={handlePlay} {...other} />;
});

Video.propTypes = {
  /**
   * JSX Attribute.
   */
  onPlay: PropTypes.func
};

export default Video;
