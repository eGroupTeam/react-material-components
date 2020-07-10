import React from 'react';
import { Focused, DateRange } from './types';
import { WithStyles, Theme } from '@material-ui/core';
export declare const styles: (
  theme: Theme
) => Record<
  'close' | 'root' | 'paper',
  | import('@material-ui/styles').CSSProperties
  | import('@material-ui/styles').CreateCSSProperties<{}>
  | ((props: {}) => import('@material-ui/styles').CreateCSSProperties<{}>)
>;
export interface DateRangePickerProps extends WithStyles<typeof styles> {
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (dateRange: DateRange, type?: Focused) => void;
  onDayClick?: (date: Date) => void;
  onCloseClick?: () => void;
  showTime?: boolean;
}
declare const _default: React.ComponentType<Pick<
  React.PropsWithChildren<DateRangePickerProps>,
  | 'children'
  | 'onChange'
  | 'minDate'
  | 'maxDate'
  | 'initialStartDate'
  | 'initialEndDate'
  | 'onDayClick'
  | 'onCloseClick'
  | 'showTime'
> &
  import('@material-ui/core').StyledComponentProps<'close' | 'root' | 'paper'>>;
export default _default;
