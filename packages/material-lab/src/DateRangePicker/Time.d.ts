import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
export declare const styles: (
  theme: Theme
) => Record<
  'header' | 'column' | 'root' | 'container' | 'item' | 'itemActive',
  | import('@material-ui/styles').CSSProperties
  | import('@material-ui/styles').CreateCSSProperties<{}>
  | ((props: {}) => import('@material-ui/styles').CreateCSSProperties<{}>)
>;
export interface TimeProps extends WithStyles<typeof styles> {
  onTimeClick?: (time: string) => void;
  value?: string;
}
declare const _default: React.ComponentType<Pick<
  React.PropsWithChildren<TimeProps>,
  'children' | 'value' | 'onTimeClick'
> &
  import('@material-ui/core').StyledComponentProps<
    'header' | 'column' | 'root' | 'container' | 'item' | 'itemActive'
  >>;
export default _default;
