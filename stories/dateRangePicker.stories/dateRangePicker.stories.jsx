import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
  isBefore
} from 'date-fns';

import DateRangePicker from '@e-group/material-lab/DateRangePicker';
import TextField from '@material-ui/core/TextField';

storiesOf('DateRangePicker', module)
  .add(
    'default',
    () => {
      const Demo = () => {
        const date = new Date()
        const [dateRange, setDateRange] = React.useState({})
        
        return (
          <>
            <DateRangePicker
              initialDateRange={{
                startDate: startOfWeek(date),
                endDate: endOfWeek(date)
              }}
              onChange={range => setDateRange(range)}
            />
            {JSON.stringify(dateRange)}
          </>
        )
      }
      return <Demo />
    },
    {
      info: {
        propTables: [DateRangePicker]
      }
    }
  )
  .add(
    'with max and min date',
    () => {
      const Demo = () => {
        const [dateRange, setDateRange] = React.useState({})
        
        return (
          <>
            <DateRangePicker
              onChange={range => setDateRange(range)}
              minDate={new Date()}
              maxDate="2020-08-08"
            />
            {JSON.stringify(dateRange)}
          </>
        )
      }
      return <Demo />
    },
    {
      info: {
        propTables: [DateRangePicker]
      }
    }
  )
  .add(
    'with controlled dates',
    () => {
      const Demo = () => {
        const [dateRange, setDateRange] = React.useState({})
        const [focuse, setFocuse] = React.useState()
        const { startDate, endDate } = dateRange

        const handleClick = name => () => {
          setFocuse(name)
        }

        // This behavior refer from hotelscombined date range picker.
        const handleDayClick = (day) => {
          const reset = () => setDateRange({ startDate: day, endDate: undefined })
          const updateStart = () => setDateRange(range => ({
            ...range,
            startDate: day
          }))
          const updateEnd = () => setDateRange(range => ({
            ...range,
            endDate: day
          }))
          if (startDate && !endDate && !isBefore(day, startDate)) {
            updateEnd()
          } else if (startDate && endDate && focuse === 'startDate' && isBefore(day, endDate)) {
            updateStart()
          } else if (startDate && endDate && focuse === 'endDate' && !isBefore(day, startDate)) {
            updateEnd()
          } else {
            reset()
          }
        }

        return (
          <>
            <TextField label="startDate" value={startDate || ''} onClick={handleClick("startDate")}/>
            <br />
            <TextField label="endDate" value={endDate || ''} onClick={handleClick("endDate")}/>
            <DateRangePicker
              onDayClick={handleDayClick}
              minDate={new Date()}
              maxDate="2020-08-08"
              setDateRange={setDateRange}
              dateRange={dateRange}
            />
            {JSON.stringify(dateRange)}
          </>
        )
      }
      return <Demo />
    },
    {
      info: {
        propTables: [DateRangePicker]
      }
    }
  )
