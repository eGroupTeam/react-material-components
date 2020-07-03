import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  startOfWeek,
  endOfWeek,
  isBefore
} from 'date-fns';

import DateRangePicker from '@e-group/material-lab/DateRangePicker';
import usePopup from '@e-group/material-lab/DateRangePicker/usePopup';
import { TextField, ClickAwayListener } from '@material-ui/core';

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
              variant="static"
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
  )
  .add(
    'with max and min date',
    () => {
      const Demo = () => {
        const [dateRange, setDateRange] = React.useState({})
        
        return (
          <>
            <DateRangePicker
              variant="static"
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
  )
  .add(
    'with controlled date',
    () => {
      const Demo = () => {
        const endDateEl = React.useRef()
        const [startDate, setStartDate] = React.useState('')
        const [endDate, setEndDate] = React.useState('')

        // This behavior refer from hotelscombined date range picker.
        const handleDayClick = (day) => {
          if (startDate && !endDate && !isBefore(day, startDate)) {
            setEndDate(day)
          } else {
            setStartDate(day)
            setEndDate('')
          }
        }

        const setDateRange = React.useCallback((range) => {
          setStartDate(range.startDate)
          setEndDate(range.endDate)
        }, [])

        return (
          <>
            {JSON.stringify({
              startDate,
              endDate
            })}
            <br />
            <TextField label="startDate" value={startDate}/>
            <TextField inputRef={endDateEl} label="endDate" value={endDate}/>
            <DateRangePicker
              variant="static"
              onDayClick={handleDayClick}
              minDate={new Date()}
              maxDate="2020-08-08"
              setDateRange={setDateRange}
              dateRange={{
                startDate,
                endDate
              }}
            />
          </>
        )
      }
      return <Demo />
    },
  )
  .add(
    'with popup',
    () => {
      const Demo = () => {
        const {
          startDate,
          endDate,
          startEl,
          endEl,
          handleStartClick,
          handleEndClick,
          open,
          handleDayClick,
          setDateRange,
          handlePopupClose
        } = usePopup()
         
        return (
          <>
            {JSON.stringify({
              startDate,
              endDate
            })}
            <br />
            <ClickAwayListener onClickAway={handlePopupClose}>
              <div>
                <TextField inputRef={startEl} label="startDate" value={startDate || ''} onClick={handleStartClick}/>
                <TextField inputRef={endEl} label="endDate" value={endDate || ''} onClick={handleEndClick}/>
                <DateRangePicker
                  open={open}
                  anchorEl={startEl.current}
                  onDayClick={handleDayClick}
                  minDate={new Date()}
                  maxDate="2020-08-08"
                  setDateRange={setDateRange}
                  onCloseClick={handlePopupClose}
                  dateRange={{
                    startDate,
                    endDate
                  }}
                />
              </div>
            </ClickAwayListener>
          </>
        )
      }
      return <Demo />
    },
  )
