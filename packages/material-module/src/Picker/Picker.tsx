import React, { forwardRef } from 'react';
import {
  DatePicker,
  TimePicker,
  KeyboardDatePicker,
  KeyboardTimePicker,
  DateTimePicker,
  KeyboardDateTimePicker,
  DatePickerProps as MuiDatePickerProps,
  KeyboardDatePickerProps as MuiKeyboardDatePickerProps,
  TimePickerProps as MuiTimePickerProps,
  KeyboardTimePickerProps as MuiKeyboardTimePickerProps,
  DateTimePickerProps as MuiDateTimePickerProps,
  KeyboardDateTimePickerProps as MuiKeyboardDateTimePickerProps,
} from '@material-ui/pickers';

export interface DatePickerProps extends MuiDatePickerProps {
  /**
   * The picker to use.
   */
  picker?: 'date';
}

export interface KeyboardDatePickerProps extends MuiKeyboardDatePickerProps {
  /**
   * The picker to use.
   */
  picker: 'keyboardDate';
}

export interface TimePickerProps extends MuiTimePickerProps {
  /**
   * The picker to use.
   */
  picker: 'time';
}

export interface KeyboardTimePickerProps extends MuiKeyboardTimePickerProps {
  /**
   * The picker to use.
   */
  picker: 'keyboardTime';
}

export interface DateTimePickerProps extends MuiDateTimePickerProps {
  /**
   * The picker to use.
   */
  picker: 'dateTime';
}

export interface KeyboardDateTimePickerProps
  extends MuiKeyboardDateTimePickerProps {
  /**
   * The picker to use.
   */
  picker: 'keyboardDateTime';
}

export type PickerProps =
  | DatePickerProps
  | KeyboardDatePickerProps
  | TimePickerProps
  | KeyboardTimePickerProps
  | DateTimePickerProps
  | KeyboardDateTimePickerProps;

export type DatePickerView = 'year' | 'date' | 'month';
export type TimePickerView = 'hours' | 'minutes' | 'seconds';
export type DateTimePickerView =
  | 'year'
  | 'date'
  | 'month'
  | 'hours'
  | 'minutes';

const Picker = forwardRef<HTMLDivElement, PickerProps>(function Picker(
  props,
  ref
) {
  const { picker = 'date', views, openTo, ...other } = props;
  switch (picker) {
    case 'time':
      return (
        <TimePicker
          ref={ref}
          views={views as TimePickerView[]}
          openTo={openTo as TimePickerView}
          {...other}
        />
      );
    case 'dateTime':
      return (
        <DateTimePicker
          ref={ref}
          views={views as DateTimePickerView[]}
          openTo={openTo as DateTimePickerView}
          {...other}
        />
      );
    case 'keyboardDate':
      return (
        <KeyboardDatePicker
          ref={ref}
          views={views as DatePickerView[]}
          openTo={openTo as DatePickerView}
          {...other}
        />
      );
    case 'keyboardTime':
      return (
        <KeyboardTimePicker
          ref={ref}
          views={views as TimePickerView[]}
          openTo={openTo as TimePickerView}
          {...other}
        />
      );
    case 'keyboardDateTime':
      return (
        <KeyboardDateTimePicker
          ref={ref}
          views={views as DateTimePickerView[]}
          openTo={openTo as DateTimePickerView}
          {...other}
        />
      );
    default:
      break;
  }
  return <DatePicker ref={ref} {...other} />;
});

export default Picker;
