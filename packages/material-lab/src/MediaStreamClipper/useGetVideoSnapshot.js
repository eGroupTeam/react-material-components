import React from 'react';

export default function useGetVideoSnapshot(ref, props) {
  const { mirrored } = props || {};

  const getVideoSnapshot = React.useCallback(
    async (type, quality) => {
      const canvas = document.createElement('canvas');
      if (!ref || !ref.current) {
        return new Promise((resolve, reject) => resolve(undefined));
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
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mirrored]
  );

  return [getVideoSnapshot];
}
