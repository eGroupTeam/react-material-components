import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
export declare const styles: (
  theme: Theme
) => Record<
  | 'button'
  | 'filled'
  | 'outlined'
  | 'invisible'
  | 'inRange'
  | 'startBorder'
  | 'endBorder'
  | 'buttonContainer'
  | 'buttonText'
  | 'hovered'
  | 'hoveredStart'
  | 'hoveredEnd'
  | 'contrast',
  | import('@material-ui/styles').CSSProperties
  | import('@material-ui/styles').CreateCSSProperties<{}>
  | ((props: {}) => import('@material-ui/styles').CreateCSSProperties<{}>)
>;
export interface DayProps extends WithStyles<typeof styles> {
  filled: boolean;
  outlined: boolean;
  isInDateRange: boolean;
  isInHoveredRange: boolean;
  disabled: boolean;
  invisible: boolean;
  startOfDateRange: boolean;
  endOfDateRange: boolean;
  startOfHoveredRange: boolean;
  endOfHoveredRange: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}
declare const _default: React.ComponentType<Pick<
  React.PropsWithChildren<DayProps>,
  | 'disabled'
  | 'filled'
  | 'children'
  | 'outlined'
  | 'onClick'
  | 'invisible'
  | 'value'
  | 'startOfDateRange'
  | 'endOfDateRange'
  | 'isInDateRange'
  | 'onHover'
  | 'isInHoveredRange'
  | 'endOfHoveredRange'
  | 'startOfHoveredRange'
> &
  import('@material-ui/core').StyledComponentProps<
    | 'button'
    | 'filled'
    | 'outlined'
    | 'invisible'
    | 'inRange'
    | 'startBorder'
    | 'endBorder'
    | 'buttonContainer'
    | 'buttonText'
    | 'hovered'
    | 'hoveredStart'
    | 'hoveredEnd'
    | 'contrast'
  >>;
export default _default;
