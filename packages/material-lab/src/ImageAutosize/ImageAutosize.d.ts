import * as React from 'react';

export interface ImageAutosizeProps {
  /**
   * Customized Image ratio.
   */
  ratio?: string;
}

declare const ImageAutosize: React.ComponentType<ImageAutosizeProps>;

export default ImageAutosize;
