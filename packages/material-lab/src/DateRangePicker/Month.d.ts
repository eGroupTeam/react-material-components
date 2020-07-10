import React from 'react';
import { Theme, WithStyles } from '@material-ui/core';
import { NavigationAction, Touched, Focused } from './types';
export declare const styles: (
  theme: Theme
) => Record<
  'root' | 'weekDaysContainer' | 'monthContainer' | 'weekContainer',
  | import('@material-ui/styles').CSSProperties
  | import('@material-ui/styles').CreateCSSProperties<{}>
  | ((props: {}) => import('@material-ui/styles').CreateCSSProperties<{}>)
>;
export interface MonthProps extends WithStyles<typeof styles> {
  startDate?: Date;
  endDate?: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  value: Date;
  touched: Touched;
  focused?: Focused;
  marker?: symbol;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleMonthNavigate: (action: NavigationAction, marker?: symbol) => void;
}
declare const _default: React.ComponentType<Pick<
  React.PropsWithChildren<MonthProps>,
  | 'marker'
  | 'children'
  | 'value'
  | 'focused'
  | 'startDate'
  | 'endDate'
  | 'minDate'
  | 'maxDate'
  | 'hoverDay'
  | 'touched'
  | 'navState'
  | 'setValue'
  | 'handleDayClick'
  | 'handleDayHover'
  | 'handleMonthNavigate'
> &
  import('@material-ui/core').StyledComponentProps<
    'root' | 'weekDaysContainer' | 'monthContainer' | 'weekContainer'
  >>;
export default _default;
