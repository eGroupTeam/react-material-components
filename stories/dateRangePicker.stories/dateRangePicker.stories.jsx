import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths
} from 'date-fns';

import DateRangePicker from '@e-group/material-lab/DateRangePicker';

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
    'with definedRanges',
    () => {
      const date = new Date()
      const Demo = () => {
        const [dateRange, setDateRange] = React.useState({})
        
        return (
          <>
            <DateRangePicker
              onChange={range => setDateRange(range)}
              definedRanges={[
                {
                  label: '今天',
                  startDate: date,
                  endDate: date
                },
                {
                  label: '昨天',
                  startDate: addDays(date, -1),
                  endDate: addDays(date, -1)
                },
                {
                  label: '本週',
                  startDate: startOfWeek(date),
                  endDate: endOfWeek(date)
                },
                {
                  label: '上一週',
                  startDate: startOfWeek(addWeeks(date, -1)),
                  endDate: endOfWeek(addWeeks(date, -1))
                },
                {
                  label: '過去７天',
                  startDate: addWeeks(date, -1),
                  endDate: date
                },
                {
                  label: '這個月',
                  startDate: startOfMonth(date),
                  endDate: endOfMonth(date)
                },
                {
                  label: '上個月',
                  startDate: startOfMonth(addMonths(date, -1)),
                  endDate: endOfMonth(addMonths(date, -1))
                }
              ]}
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
