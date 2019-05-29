import * as React from 'react';

export interface PositionProps {
  height?: number | string;
  alignItems?: 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'initial' | 'inherit';
}

declare const Position: React.ComponentType<PositionProps>;

export default Position;