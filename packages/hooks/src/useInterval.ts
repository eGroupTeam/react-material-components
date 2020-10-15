import { useEffect, useRef } from 'react';

type Callback = () => void;

/**
 * https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 */
export default function useInterval(callback: Callback, delay: number | null) {
  const savedCallback = useRef<Callback>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current) {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return () => {};
  }, [delay]);
}
