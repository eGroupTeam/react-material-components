import React from 'react';

export default function useGetVideoSnapshot({ mirrored }) {
  const ref = React.useRef(null);

  const getVideoSnapshot = async (type, quality) => {
    const canvas = document.createElement('canvas');
    if (!ref || !ref.current) {
      return undefined;
    }
    canvas.width = ref.current.videoWidth;
    canvas.height = ref.current.videoHeight;

    const ctx = canvas.getContext('2d');

    if (mirrored) {
      ctx.scale(-1, 1);
      ctx.drawImage(ref.current, 0, 0, canvas.width * -1, canvas.height);
    } else {
      ctx.drawImage(ref.current, 0, 0);
    }

    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(resolve, type, quality);
      } catch (error) {
        reject(error);
      }
    });
  };

  return [getVideoSnapshot, ref];
}
