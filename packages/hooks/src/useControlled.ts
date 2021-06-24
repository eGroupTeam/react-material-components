import { useRef, useState, useCallback } from 'react';

export type UseControlledArgs<Value> = {
  controlled: Value;
  default: NonNullable<Value>;
};

export default function useControlled<Value = unknown>({
  controlled,
  default: defaultProp,
}: UseControlledArgs<Value>): [NonNullable<Value>, (newValue: NonNullable<Value>) => void] {
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = useCallback((newValue: NonNullable<Value>) => {
    if (!isControlled) {
      setValue(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value as NonNullable<Value>, setValueIfUncontrolled];
}
