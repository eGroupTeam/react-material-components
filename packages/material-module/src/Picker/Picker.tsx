import React, { FC } from 'react';
import {
  DatePicker,
  DatePickerProps as MuiDatePickerProps,
  KeyboardDatePicker,
  KeyboardDatePickerProps as MuiKeyboardDatePickerProps,
  TimePicker,
  TimePickerProps as MuiTimePickerProps,
  KeyboardTimePicker,
  KeyboardTimePickerProps as MuiKeyboardTimePickerProps,
  DateTimePicker,
  DateTimePickerProps as MuiDateTimePickerProps,
  KeyboardDateTimePicker,
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

const pickerComponent = {
  date: DatePicker,
  time: TimePicker,
  dateTime: DateTimePicker,
  keyboardDate: KeyboardDatePicker,
  keyboardTime: KeyboardTimePicker,
  keyboardDateTime: KeyboardDateTimePicker,
};

const Picker: FC<PickerProps> = ({ picker = 'date', ...other }) => {
  const PickerComponent: any = pickerComponent[picker];

  return <PickerComponent {...other} />;
};

export default Picker;
