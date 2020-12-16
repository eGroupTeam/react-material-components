import { Dispatch, SetStateAction, useState } from 'react';

import useInterval from './useInterval';

export type UseCountDownOptions = {
  min?: number;
};
export default function useCountDown(
  value: number,
  options?: UseCountDownOptions
): [number, Dispatch<SetStateAction<boolean>>] {
  const { min } = options || {};
  const [number, setNumber] = useState<number>(value);
  const [start, setStart] = useState<boolean>(false);

  useInterval(
    () => {
      if (min !== undefined) {
        if (number - 1 >= min) {
          setNumber(number - 1);
        } else {
          setStart(false);
        }
      } else {
        setNumber(number - 1);
      }
    },
    start ? 1000 : null
  );

  return [number, setStart];
}
