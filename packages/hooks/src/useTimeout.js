/* eslint-disable */
import React from 'react';

/**
 * https://github.com/streamich/react-use/blob/master/src/useTimeoutFn.ts
 * @param {*} fn
 * @param {*} ms
 */
export default function useTimeout(fn, ms = 0) {
  const ready = React.useRef(false);
  const timeout = React.useRef();
  const callback = React.useRef(fn);

  const isReady = React.useCallback(() => ready.current, []);

  const set = React.useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      ready.current = true;
      callback.current();
    }, ms);
  }, [ms]);

  const clear = React.useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  // update ref when function changes
  React.useEffect(() => {
    callback.current = fn;
  }, [fn]);

  // set on mount, clear on unmount
  React.useEffect(() => {
    set();

    return clear;
  }, [ms]);

  return [isReady, clear, set];
}
