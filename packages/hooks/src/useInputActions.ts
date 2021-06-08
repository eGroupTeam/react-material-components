import { useCallback, useRef } from 'react';

export default function useInputActions() {
  const inputEl = useRef<HTMLInputElement>();
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

  return {
    inputEl,
    select,
    focus,
  };
}
