import * as React from 'react';

export interface MediaStreamClipperProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: object;
  /**
   * To defined facingMode default is `user`.
   */
  facingMode?: string;
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
  onTimeout?: Function;
  /**
   * Handle after get user media fulfilled.
   */
  onGetUserMediaFulfilled?: Function;
  /**
   * Handle after get user media rejected.
   */
  onGetUserMediaRejected?: Function;
  /**
   * Handle after get user media error.
   */
  onGetUserMediaError?: Function;
  /**
   * Handle interval get screenshot when video play.
   */
  handleGetIntervalShot?: Function;
  /**
   * Set `true` to get a mirrored version of the video stream.
   */
  mirrored?: boolean;
  /**
   * JSX Attribute.
   */
  className?: string;
  onPlay?: Function;
}

declare const MediaStreamClipper: React.ComponentType<MediaStreamClipperProps>;

export default MediaStreamClipper;
