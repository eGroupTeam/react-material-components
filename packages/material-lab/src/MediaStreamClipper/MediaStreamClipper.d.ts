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
   * Set timeout to stop screenshot.
   */
  timeout?: number;
  /**
   * Handle after timeout paused.
   */
  onTimeoutPause?: Function;
  /**
   * Handle interval get screenshot when video play.
   */
  handleGetIntervalShot?: Function;
  /**
   * Set `true` to stop interval get screenshot.
   */
  isStop?: bool;
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
