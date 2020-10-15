import { useCallback, useEffect, useRef } from 'react';

/**
 * https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts
 */
export default function useTimeout(
  fn: any,
  ms = 0
): [() => boolean | null, () => void, () => void] {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<NodeJS.Timeout>();
  const callback = useRef(fn);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}
