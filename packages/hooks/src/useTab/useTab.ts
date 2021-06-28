import { useEffect, useState } from 'react';
import cache from './cache';

export default function useTab<Value = number>(key: string, defaultValue?: Value) {
  const [value, setValue] = useState<Value>(cache.get(key) ?? defaultValue ?? 0);

  useEffect(() => {
    cache.set(key, value);
  }, [key, value]);

  const handleChange = (newValue: Value) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
    setValue,
  };
}
