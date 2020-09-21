import React, {
  FC,
  useRef,
  useEffect,
  SyntheticEvent,
  VideoHTMLAttributes,
} from 'react';

import useInterval from '@e-group/hooks/useInterval';
import useTimeout from '@e-group/hooks/useTimeout';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import clsx from 'clsx';
import useGetVideoSnapshot from './useGetVideoSnapshot';

const styles = () => ({
  mirrored: {
    transform: 'rotateY(180deg)',
  },
});

export type FacingMode = 'user' | 'environment';

export interface MediaStreamClipperProps
  extends WithStyles<typeof styles>,
    VideoHTMLAttributes<HTMLVideoElement> {
  /**
   * To defined facingMode default is `user`.
   */
  facingMode?: FacingMode;
  /**
   * Set interval get screenshot time default is `200`.
   */
  intervalTime?: number;
  /**
   * Set shapshot quality default is `0.8`.
   */
  quality?: number;
  /**
   * Set timeout to pause streaming.
   */
  timeout?: number;
  /**
   * Handle after timeout.
   */
  onTimeout?: () => void;
  /**
   * Handle after get user media fulfilled.
   */
  onGetUserMediaFulfilled?: (videoEl: HTMLVideoElement) => void;
  /**
   * Handle after get user media rejected.
   */
  onGetUserMediaRejected?: (reason: any) => void;
  /**
   * Handle after get user media error.
   */
  onGetUserMediaError?: (error: any) => void;
  /**
   * Handle interval get screenshot when video play.
   */
  handleGetIntervalShot?: (
    blob: Blob,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D | null
  ) => void;
  /**
   * Set `true` to get a mirrored version of the video stream.
   */
  mirrored?: boolean;
  /**
   * Set `true` to stop get interval shot.
   */
  isStop?: boolean;
}

/**
 * Use MediaStream to extends video and get screenshot interval when streaming open.
 */
const MediaStreamClipper: FC<MediaStreamClipperProps> = ({
  classes,
  className,
  facingMode = 'user',
  onPlay,
  onTimeout,
  onGetUserMediaFulfilled,
  onGetUserMediaRejected,
  onGetUserMediaError,
  isStop,
  intervalTime = 200,
  timeout,
  quality = 0.8,
  handleGetIntervalShot,
  mirrored,
  ...other
}) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const [getVideoSnapshot] = useGetVideoSnapshot(videoEl, { mirrored });
  // Set min avoid frame lag.
  const minIntervalTime = intervalTime < 33 ? 33 : intervalTime;

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

  useInterval(
    async () => {
      const { blob, canvas, ctx } = await getVideoSnapshot(
        'image/jpeg',
        quality
      );
      if (handleGetIntervalShot && blob && canvas && ctx) {
        handleGetIntervalShot(blob, canvas, ctx);
      }
    },
    isStop ? null : minIntervalTime
  );

  useEffect(() => {
    const constraints = {
      audio: false,
      video: {
        facingMode,
      },
    };
    const onfulfilled = (value: MediaStream) => {
      if (!videoEl.current) return;
      if (onGetUserMediaFulfilled) {
        onGetUserMediaFulfilled(videoEl.current);
      }
      const isNewBrowser = 'srcObject' in videoEl.current;

      // Older browsers may not have srcObject
      if (isNewBrowser) {
        videoEl.current.srcObject = value;
      } else {
        // Avoid using this in new browsers, as it is going away.
        videoEl.current.src = window.URL.createObjectURL(value);
      }
    };
    const onrejected = (reason: any) => {
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
    onGetUserMediaRejected,
  ]);

  const handlePlay = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
    reset();
    if (onPlay) {
      onPlay(e);
    }
  };

  return (
    <video
      className={clsx(className, {
        [classes.mirrored]: mirrored,
      })}
      ref={videoEl}
      onPlay={handlePlay}
      {...other}
    />
  );
};

export default withStyles(styles)(MediaStreamClipper);
