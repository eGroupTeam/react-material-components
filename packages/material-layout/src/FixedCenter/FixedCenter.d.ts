import React from 'react';
import { WithStyles, Theme } from '@material-ui/core';
export declare const styles: (
  theme: Theme
) => Record<
  'root',
  | import('@material-ui/styles').CSSProperties
  | import('@material-ui/styles').CreateCSSProperties<{}>
  | ((props: {}) => import('@material-ui/styles').CreateCSSProperties<{}>)
>;
export interface FixedCenterProps extends WithStyles<typeof styles> {
  className?: string;
}
declare const _default: React.ComponentType<Pick<
  React.PropsWithChildren<FixedCenterProps>,
  'children' | 'className'
> &
  import('@material-ui/core').StyledComponentProps<'root'>>;
export default _default;
