import { WithStyles } from '@material-ui/core';
import { styles } from './DateRangePicker';
import { styles as headerStyles } from './Header';
import { styles as monthStyles } from './Month';
import { styles as dayStyles } from './Day';
import { styles as timeStyles } from './Time';

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

export interface RangeMenuProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  startDate: Date;
  endDate: Date;
  minDate: Date;
  maxDate: Date;
  hoverDay?: Date;
  touched: Touched;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
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
  marker?: symbol;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  handleDayClick: (date: Date) => void;
  handleDayHover: (date: Date) => void;
  handleMonthNavigate: (action: NavigationAction, marker?: symbol) => void;
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

export interface TimeProps extends WithStyles<typeof timeStyles> {}

export default interface DateRangePickerProps
  extends WithStyles<typeof styles> {
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (date: Date, type: Focused) => void;
  onDayClick?: (date: Date) => void;
  onCloseClick?: () => void;
  showTime?: boolean;
}
