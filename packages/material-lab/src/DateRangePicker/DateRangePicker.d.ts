import { WithStyles } from '@material-ui/core';
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

export type DefinedRange = {
  startDate: Date;
  endDate: Date;
  label: string;
};

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
  initialDateRange?: DateRange;
  definedRanges?: DefinedRange[];
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange?: (dateRange: DateRange) => void;
  onDayClick?: (date: Date) => void;
  setDateRange?: (dateRange: DateRange) => void;
  dateRange?: DateRange;
}
