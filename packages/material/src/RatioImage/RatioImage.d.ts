import * as React from 'react';

export interface RatioImageProps {
  /**
   * Image src.
   */
  src: string;
  /**
   * Image object fit.
   */
  fit: string;
  /**
   * Image ratio
   */
  ratio: string;
}

declare const RatioImage: React.ComponentType<RatioImageProps>;

export default RatioImage;
