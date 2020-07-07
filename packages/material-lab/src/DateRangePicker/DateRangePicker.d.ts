import { WithStyles } from '@material-ui/core';
import { styles as menuStyles } from './Menu';
import { styles as pickerStyles } from './DateRangePicker';
import { styles as headerStyles } from './Header';
import { styles as monthStyles } from './Month';
import { styles as dayStyles } from './Day';

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

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
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  hoverDay: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  touched: Touched;
  onCloseClick?: () => void;
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
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  hoverDay: Date;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
  touched: Touched;
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

export default interface DateRangePickerProps
  extends WithStyles<typeof pickerStyles> {
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (date: Date, type: Focused) => void;
  onDayClick?: (date: Date) => void;
  onCloseClick?: () => void;
  showTime?: boolean;
}
