import { useCallback, useEffect, useRef } from 'react';

type Callback = () => void;
type IsReady = () => boolean | null;
type Clear = () => void;
type Set = () => void;
/**
 * https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts
 */
export default function useTimeout(
  cb: Callback,
  ms: number | null
): [IsReady, Clear, Set] {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<NodeJS.Timeout>();
  const callback = useRef(cb);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (ms !== null) {
      timeout.current = setTimeout(() => {
        ready.current = true;
        callback.current();
      }, ms);
    }
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }, []);

  // update ref when function changes
  useEffect(() => {
    callback.current = cb;
  }, [cb]);

  // set on mount, clear on unmount
  useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}
