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

        const handleChange = React.useCallback((dateRange, focused) => {
          setStartDate(dateRange[0])
          setEndDate(dateRange[1])
        }, [])

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
              onChange={handleChange}
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

        const handleChange = React.useCallback((dateRange, focused) => {
          setStartDate(dateRange[0])
          setEndDate(dateRange[1])
        }, [])

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
              onChange={handleChange}
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

        const handleChange = React.useCallback((dateRange, focused) => {
          setStartDate(dateRange[0])
          setEndDate(dateRange[1])
        }, [])
        
        return (
          <>
            {JSON.stringify({
              startDate,
              endDate
            })}
            <br />
            <DateRangePicker
              showTime
              onChange={handleChange}
            />
          </>
        )
      }
      return <Demo />
    },
  )
