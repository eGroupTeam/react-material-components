import * as React from 'react';
import {
  DatePickerProps,
  TimePickerProps,
  DateTimePickerProps,
  KeyboardDatePickerProps,
  KeyboardTimePickerProps,
  KeyboardDateTimePickerProps
} from '@material-ui/pickers';

export interface BaseDatePickerFieldProps extends DatePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface DatePickerFieldProps extends BaseDatePickerFieldProps {
  picker?: 'date';
}

export interface BaseTimePickerFieldProps extends TimePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface TimePickerFieldProps extends BaseTimePickerFieldProps {
  picker: 'time';
}

export interface BaseDateTimePickerFieldProps extends DateTimePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface DateTimePickerFieldProps extends BaseDateTimePickerFieldProps {
  picker: 'dateTime';
}

export interface BaseKeyboardDatePickerFieldProps
  extends KeyboardDatePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface KeyboardDatePickerFieldProps
  extends BaseKeyboardDatePickerFieldProps {
  picker: 'keyboardDate';
}

export interface BaseKeyboardTimePickerFieldProps
  extends KeyboardTimePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface KeyboardTimePickerFieldProps
  extends BaseKeyboardTimePickerFieldProps {
  picker: 'keyboardTime';
}

export interface BaseKeyboardDateTimePickerFieldProps
  extends KeyboardDateTimePickerProps {
  /**
   * To avoid conflict with Field format prop.
   */
  pickerFormat?: string;
}

export interface KeyboardDateTimePickerFieldProps
  extends BaseKeyboardDateTimePickerFieldProps {
  picker: 'keyboardDateTime';
}

export type PickerFieldProps =
  | DatePickerFieldProps
  | TimePickerFieldProps
  | DateTimePickerFieldProps
  | KeyboardDatePickerFieldProps
  | KeyboardTimePickerFieldProps
  | KeyboardDateTimePickerFieldProps;

declare const PickerField: React.ComponentType<PickerFieldProps>;

export default PickerField;
