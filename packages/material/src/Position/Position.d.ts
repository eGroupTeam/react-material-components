import * as React from 'react';

export interface PositionProps {
  /**
   * Defined the container height.
   */
  height?: number | string;
  /**
   * Defined the container alignItems.
   */
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  /**
   * Defined the container justifyContent.
   */
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'initial' | 'inherit';
}

declare const Position: React.ComponentType<PositionProps>;

export default Position;