import { WithStyles } from '@material-ui/core';
import { ReferenceObject } from 'popper.js';
import { styles as pickerStyles } from './DateRangePicker';
import { styles as headerStyles } from './Header';
import { styles as monthStyles } from './Month';
import { styles as dayStyles } from './Day';

export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

export type Setter<T> =
  | React.Dispatch<React.SetStateAction<T>>
  | ((value: T) => void);

export enum NavigationAction {
  Previous = -1,
  Next = 1
}

export type Falsy = false | null | undefined | 0 | '';

export type Marker = symbol;

export interface MenuProps {
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
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
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
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
  variant?: 'popup' | 'static';
  open?: boolean;
  anchorEl?: null | ReferenceObject | (() => ReferenceObject);
  initialDateRange?: DateRange;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (dateRange: DateRange) => void;
  onDayClick?: (date: Date) => void;
  setDateRange?: (dateRange: DateRange) => void;
  onCloseClick?: () => void;
  dateRange?: DateRange;
}
