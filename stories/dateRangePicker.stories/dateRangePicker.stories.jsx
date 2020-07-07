import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  startOfMonth,
  endOfWeek,
  endOfMonth
} from 'date-fns';

import DateRangePicker from '@e-group/material-lab/DateRangePicker';

storiesOf('DateRangePicker', module)
  .add(
    'default',
    () => {
      const Demo = () => {
        const date = new Date()
        const [startDate, setStartDate] = React.useState()
        const [endDate, setEndDate] = React.useState()

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
              onChange={(date, type) => {
                if (type === 'start') {
                  setStartDate(date)
                }
                if (type === 'end') {
                  setEndDate(date)
                }
              }}
            />
          </>
        )
      }
      return <Demo />
    },
  )
  .add(
    'with max & min',
    () => {
      const Demo = () => {
        const date = new Date()
        const [startDate, setStartDate] = React.useState()
        const [endDate, setEndDate] = React.useState()

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
              onChange={(date, type) => {
                if (type === 'start') {
                  setStartDate(date)
                }
                if (type === 'end') {
                  setEndDate(date)
                }
              }}
            />
          </>
        )
      }
      return <Demo />
    },
  )
  .add(
    'with time',
    () => {
      const Demo = () => {
        const [startDate, setStartDate] = React.useState()
        const [endDate, setEndDate] = React.useState()

        return (
          <>
            {JSON.stringify({
              startDate,
              endDate
            })}
            <br />
            <DateRangePicker
              showTime
              onChange={(date, type) => {
                if (type === 'start') {
                  setStartDate(date)
                }
                if (type === 'end') {
                  setEndDate(date)
                }
              }}
            />
          </>
        )
      }
      return <Demo />
    },
  )
