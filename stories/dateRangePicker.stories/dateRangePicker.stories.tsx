import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import {
  startOfMonth,
  endOfWeek,
  endOfMonth
} from 'date-fns';

import DateRangePicker, { DateRangePickerProps } from '@e-group/material-lab/DateRangePicker';

export default {
  title: 'Lab/DateRangePicker',
  component: DateRangePicker,
} as Meta;

export const Default: Story<DateRangePickerProps> = (args) => {
  const date = new Date()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  return (
    <>
      {JSON.stringify({
        startDate,
        endDate
      })}
      <br />
      <DateRangePicker
        initialStartDate={startOfMonth(date)}
        initialEndDate={endOfWeek(date)}
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0])
          setEndDate(dateRange[1])
        }}
        {...args}
      />
    </>
  )
};

export const WithMaxAndMin: Story<DateRangePickerProps> = (args) => {
  const date = new Date()
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  return (
    <>
      {JSON.stringify({
        startDate,
        endDate
      })}
      <br />
      <DateRangePicker
        initialStartDate={date}
        initialEndDate={endOfWeek(date)}
        minDate={startOfMonth(date)}
        maxDate={endOfMonth(date)}
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0])
          setEndDate(dateRange[1])
        }}
        {...args}
      />
    </>
  )
};

export const WithTime: Story<DateRangePickerProps> = (args) => {
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  
  return (
    <>
      {JSON.stringify({
        startDate,
        endDate
      })}
      <br />
      <DateRangePicker
        showTime
        onChange={(dateRange, focused) => {
          setStartDate(dateRange[0])
          setEndDate(dateRange[1])
        }}
        {...args}
      />
    </>
  )
};