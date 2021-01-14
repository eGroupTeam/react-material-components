import { useEffect, useState } from 'react';
import cache from './cache';

export default function useTab(key: string, defaultValue = 0) {
  const [value, setValue] = useState(cache.get(key) ?? defaultValue);

  useEffect(() => {
    cache.set(key, value);
  }, [key, value]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
    setValue,
  };
}
