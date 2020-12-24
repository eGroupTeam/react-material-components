import { RefObject, useCallback } from 'react';

export type Options = {
  /**
   * Set `true` to get a mirrored version of the video stream.
   */
  mirrored?: boolean;
};

export type VideoSnapshotResult = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  blob: Blob | null;
};

const isBrowser = typeof document !== 'undefined';

export default function useGetVideoSnapshot(
  ref: RefObject<HTMLVideoElement>,
  options: Options = {}
) {
  const { mirrored } = options;

  const getVideoSnapshot = useCallback(
    async (
      type?: string,
      quality?: number
    ): Promise<VideoSnapshotResult | undefined> => {
      if (!isBrowser)
        return Promise.reject(new Error('Not browser environment.'));
      const canvas = document.createElement('canvas');
      if (!ref || !ref.current) {
        return new Promise((resolve) => resolve(undefined));
      }
      canvas.width = ref.current.videoWidth;
      canvas.height = ref.current.videoHeight;

      const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
      // fixed ctx maybe null issue
      // https://github.com/microsoft/TypeScript/issues/19229
      if (!ctx) {
        throw new Error(
          `2d context not supported or canvas already initialized`
        );
      }

      if (mirrored) {
        ctx.scale(-1, 1);
        ctx.drawImage(ref.current, 0, 0, canvas.width * -1, canvas.height);
      } else {
        ctx.drawImage(ref.current, 0, 0);
      }

      return new Promise((resolve, reject) => {
        try {
          canvas.toBlob(
            (blob) => {
              resolve({ canvas, ctx, blob });
            },
            type,
            quality
          );
        } catch (error) {
          reject(error);
        }
      });
    },
    [ref, mirrored]
  );

  return [getVideoSnapshot];
}
