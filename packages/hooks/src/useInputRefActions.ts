import { useCallback, useRef } from 'react';

export default function useInputRefActions() {
  const inputEl = useRef<HTMLInputElement>(null);
  const select = useCallback(() => {
    if (inputEl.current) {
      inputEl.current.select();
      inputEl.current.setSelectionRange(0, 99999); /* For mobile devices */
    }
  }, []);

  const focus = useCallback(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  }, []);

  const clearValue = useCallback(() => {
    if (inputEl.current) {
      inputEl.current.value = '';
    }
  }, []);

  return {
    inputEl,
    select,
    focus,
    clearValue,
  };
}
