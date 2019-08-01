import * as React from 'react';

export interface VideoProps {
  /**
   * JSX Attribute with getScreenshot.
   */
  onPlay?: Function;
}

declare const Video: React.ComponentType<VideoProps>;

export default Video;
