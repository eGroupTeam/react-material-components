import React from 'react';
import { WithStyles } from '@material-ui/core';
export declare const styles: Record<
  'icon' | 'iconContainer',
  | import('@material-ui/styles').CSSProperties
  | import('@material-ui/styles').CreateCSSProperties<{}>
  | ((props: {}) => import('@material-ui/styles').CreateCSSProperties<{}>)
>;
export interface HeaderProps extends WithStyles<typeof styles> {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}
declare const _default: React.ComponentType<Pick<
  React.PropsWithChildren<HeaderProps>,
  | 'children'
  | 'date'
  | 'setDate'
  | 'nextDisabled'
  | 'prevDisabled'
  | 'onClickNext'
  | 'onClickPrevious'
> &
  import('@material-ui/core').StyledComponentProps<'icon' | 'iconContainer'>>;
export default _default;
