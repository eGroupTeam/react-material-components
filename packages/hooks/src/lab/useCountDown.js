import React from 'react';

import useInterval from '../useInterval';
/**
 * Create a count down value.
 */
export default function useCountDown(value) {
  const [number, setNumber] = React.useState(value);
  const [start, setStart] = React.useState(false);

  useInterval(
    () => {
      setNumber((val) => (val -= 1));
    },
    start ? 1000 : null
  );

  return [number, setStart];
}
