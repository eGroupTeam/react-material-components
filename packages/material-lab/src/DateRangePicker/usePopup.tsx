import React from 'react';

import { isBefore } from 'date-fns';

export default function usePopup() {
  const { current: store } = React.useRef({
    focused: ''
  });
  const startEl = React.useRef();
  const endEl = React.useRef();
  const [startDate, setStartDate] = React.useState();
  const [endDate, setEndDate] = React.useState();
  const [open, setOpen] = React.useState(false);

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    setOpen(false);
  };

  const focusStartDate = () => {
    store.focused = 'start';
  };

  const focusEndDate = () => {
    store.focused = 'end';
    const {
      current = {
        focus: () => {}
      }
    } = endEl;
    current.focus();
  };

  const handleStartClick = event => {
    focusStartDate();
    handlePopupOpen();
  };

  const handleEndClick = event => {
    focusEndDate();
    handlePopupOpen();
  };

  // This behavior refer from hotelscombined date range picker.
  const handleDayClick = day => {
    if (startDate && !endDate && !isBefore(day, startDate)) {
      setEndDate(day);
      handlePopupClose();
    } else if (
      startDate &&
      endDate &&
      store.focused === 'start' &&
      isBefore(day, endDate)
    ) {
      setStartDate(day);
      focusEndDate();
    } else if (
      startDate &&
      endDate &&
      store.focused === 'end' &&
      !isBefore(day, startDate)
    ) {
      setEndDate(day);
      handlePopupClose();
    } else {
      setStartDate(day);
      setEndDate(undefined);
      focusEndDate();
    }
  };

  const setDateRange = React.useCallback(range => {
    setStartDate(range.startDate);
    setEndDate(range.endDate);
  }, []);

  return {
    store,
    startEl,
    endEl,
    startDate,
    endDate,
    open,
    handlePopupOpen,
    handlePopupClose,
    focusStartDate,
    focusEndDate,
    handleStartClick,
    handleEndClick,
    handleDayClick,
    setDateRange
  };
}
