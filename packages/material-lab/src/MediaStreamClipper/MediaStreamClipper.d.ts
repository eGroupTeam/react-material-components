import * as React from 'react';

export interface MediaStreamClipperProps {
  /**
   * To defined facingMode default is `user`.
   */
  facingMode: string;
  /**
   * Set interval get screenshot time default is `200`.
   */
  intervalTime: number;
  /**
   * Set shapshot quality default is `0.8`.
   */
  quality: number;
  /**
   * Set timeout to pause streaming.
   */
  timeout?: number;
  /**
   * Handle after timeout.
   */
  onTimeout?: Function;
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
  onPlay?: Function;
  /**
   * JSX Attribute.
   */
  onPause?: Function;
}

declare const MediaStreamClipper: React.ComponentType<MediaStreamClipperProps>;

export default MediaStreamClipper;
