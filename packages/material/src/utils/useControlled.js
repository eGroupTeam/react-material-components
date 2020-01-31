import React from 'react';

export default function useControlled({ controlled, default: defaultProp }) {
  const ref = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = ref.current ? controlled : valueState;

  const setValueIfUncontrolled = React.useCallback(newValue => {
    if (!ref.current) {
      setValue(newValue);
    }
  }, []);

  return [value, setValueIfUncontrolled];
}
