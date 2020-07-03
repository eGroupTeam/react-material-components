import React from 'react';

import { isBefore, isAfter } from 'date-fns';

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
    const {
      current = {
        focus: () => {}
      }
    } = startEl;
    current.focus();
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

  // This behavior refer from ant design range picker.
  const handleDayClick = day => {
    if (store.focused === 'start') {
      if (!startDate && !endDate) {
        setStartDate(day);
        focusEndDate();
      } else if (!startDate && !isAfter(day, endDate)) {
        setStartDate(day);
        handlePopupClose();
      } else if (startDate && !isAfter(day, endDate)) {
        setStartDate(day);
        focusEndDate();
      } else if (startDate && isAfter(day, endDate)) {
        setStartDate(day);
        setEndDate(undefined);
        focusEndDate();
      }
    } else if (store.focused === 'end') {
      if (!startDate && !endDate) {
        setEndDate(day);
        focusStartDate();
      } else if (!endDate && !isBefore(day, startDate)) {
        setEndDate(day);
        handlePopupClose();
      } else if (endDate && !isBefore(day, startDate)) {
        setEndDate(day);
        handlePopupClose();
      } else if (endDate && isBefore(day, startDate)) {
        setEndDate(day);
        setStartDate(undefined);
        focusStartDate();
      }
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
