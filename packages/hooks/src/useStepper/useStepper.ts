import { useEffect, useState } from 'react';
import cache from './cache';

export default function useStepper(
  key: string,
  totalSteps: number,
  defaultValue = 0
) {
  const [value, setValue] = useState(cache.get(key) ?? defaultValue);

  useEffect(() => {
    cache.set(key, value);
  }, [key, value]);

  const handlePrev = () => {
    if (value > 0) {
      setValue((val) => val - 1);
    }
  };

  const handleNext = () => {
    if (value < totalSteps) {
      setValue((val) => val + 1);
    }
  };

  return {
    value,
    handlePrev,
    handleNext,
    setValue,
  };
}
