import React, {
  FC,
  useRef,
  useEffect,
  SyntheticEvent,
  VideoHTMLAttributes,
  useCallback,
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
   * Set timeout to pause video.
   */
  pauseOnTimeout?: number;
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
   * Set `true` to stop snapshot `false` to continue snapshot.
   */
  isStopSnapshot?: boolean;
  /**
   * Set `true` to pause video `false` to continue play.
   */
  isPause?: boolean;
  /**
   * Set `true` to stop streaming `false` to continue streaming.
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
  isStopSnapshot,
  isPause,
  isStop,
  intervalTime = 200,
  pauseOnTimeout,
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
    if (videoEl.current) {
      videoEl.current.pause();
    }
    if (onTimeout) {
      onTimeout();
    }
  };

  const [, , reset] = useTimeout(handleTimeout, pauseOnTimeout ?? null);

  useInterval(
    async () => {
      const result = await getVideoSnapshot('image/jpeg', quality);
      if (handleGetIntervalShot && result) {
        const { blob, canvas, ctx } = result;
        if (blob && canvas && ctx) {
          handleGetIntervalShot(blob, canvas, ctx);
        }
      }
    },
    isStopSnapshot ? null : minIntervalTime
  );

  const startStreaming = useCallback(() => {
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

      if ('srcObject' in videoEl.current) {
        videoEl.current.srcObject = value;
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

  const stopStreaming = useCallback(() => {
    if (videoEl.current && 'srcObject' in videoEl.current) {
      const stream = videoEl.current.srcObject as MediaStream;

      if (stream) {
        const tracks = stream.getTracks();

        tracks.forEach((track) => track.stop());
      }
    }
  }, []);

  useEffect(() => {
    if (isStop) {
      stopStreaming();
    } else {
      startStreaming();
    }
  }, [isStop]);

  useEffect(() => {
    if (videoEl.current) {
      if (isPause) {
        videoEl.current.pause();
      } else {
        videoEl.current.play();
      }
    }
  }, [isPause]);

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
