import React from 'react';

export default function useGetVideoSnapshot() {
  const ref = React.useRef(null);

  const getVideoSnapshot = async (type, quality) => {
    const canvas = document.createElement('canvas');
    if (!ref || !ref.current) {
      return undefined;
    }
    canvas.width = ref.current.videoWidth;
    canvas.height = ref.current.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(ref.current, 0, 0);
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
