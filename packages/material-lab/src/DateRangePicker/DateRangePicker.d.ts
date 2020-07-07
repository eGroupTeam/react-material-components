import { WithStyles } from '@material-ui/core';
import { styles as menuStyles } from './Menu';
import { styles as headerStyles } from './Header';
import { styles as monthStyles } from './Month';
import { styles as dayStyles } from './Day';
import { MutableRefObject } from 'react';

export type Focused = 'start' | 'end';

export type Touched = {
  start: boolean;
  end: boolean;
};

export type Setter<T> =
  | React.Dispatch<React.SetStateAction<T>>
  | ((value: T) => void);

export enum NavigationAction {
  Previous = -1,
  Next = 1
}

export type Falsy = false | null | undefined | 0 | '';

export type Marker = symbol;

export interface MenuProps extends WithStyles<typeof menuStyles> {
  initialStartDate?: Date;
  initialEndDate?: Date;
  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  startEl: MutableRefObject<undefined>;
  endEl: MutableRefObject<undefined>;
  open: boolean;
  touched: Touched;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleStartClick: () => void;
  handleEndClick: () => void;
  handlePopupOpen: () => void;
  handlePopupClose: () => void;
}

interface HeaderProps extends WithStyles<typeof headerStyles> {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

interface MonthProps extends WithStyles<typeof monthStyles> {
  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  value: Date;
  touched: Touched;
  marker: symbol;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleMonthNavigate: (marker: symbol, action: NavigationAction) => void;
}
export interface DayProps extends WithStyles<typeof dayStyles> {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  invisible?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

export default interface DateRangePickerProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (date: Date, type: Focused) => void;
  onDayClick?: (date: Date) => void;
  onCloseClick?: () => void;
  showTime?: boolean;
}
