import { useState } from 'react';
import cache from './cache';

export default function useTab(key: string, defaultValue = 0) {
  const [value, setValue] = useState(cache.get(key) ?? defaultValue);

  const handleChange = (newValue: number) => {
    cache.set(key, newValue);
    setValue(newValue);
  };

  return {
    value,
    handleChange,
    setValue,
  };
}
