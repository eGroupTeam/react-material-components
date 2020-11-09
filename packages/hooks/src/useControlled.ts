import { useRef, useState, useCallback } from 'react';

export type UseControlledArgs = {
  controlled: any;
  default: any;
};
export default function useControlled({
  controlled,
  default: defaultProp,
}: UseControlledArgs) {
  const { current: isControlled } = useRef(controlled !== undefined);
  const [valueState, setValue] = useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setValueIfUncontrolled];
}
