import React from 'react';
import { Marker, Touched, Focused } from './types';
import { Theme, WithStyles } from '@material-ui/core';
export declare const MARKERS: {
  [key: string]: Marker;
};
export declare const styles: (
  theme: Theme
) => Record<
  'root' | 'container',
  | import('@material-ui/styles').CSSProperties
  | import('@material-ui/styles').CreateCSSProperties<{}>
  | ((props: {}) => import('@material-ui/styles').CreateCSSProperties<{}>)
>;
export interface MenuProps extends WithStyles<typeof styles> {
  startDate?: Date;
  endDate?: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  touched: Touched;
  focused?: Focused;
  startTime?: string;
  endTime?: string;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleTimeClick: (time: string) => void;
}
declare const _default: React.ComponentType<Pick<
  React.PropsWithChildren<MenuProps>,
  | 'children'
  | 'focused'
  | 'startDate'
  | 'endDate'
  | 'minDate'
  | 'maxDate'
  | 'hoverDay'
  | 'touched'
  | 'handleDayClick'
  | 'handleDayHover'
  | 'startTime'
  | 'endTime'
  | 'handleTimeClick'
> &
  import('@material-ui/core').StyledComponentProps<'root' | 'container'>>;
export default _default;
