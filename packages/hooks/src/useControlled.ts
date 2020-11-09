import * as React from 'react';

export type UseControlledArgs = {
  controlled: any;
  default: any;
};
export default function useControlled({
  controlled,
  default: defaultProp,
}: UseControlledArgs) {
  const { current: isControlled } = React.useRef(controlled !== undefined);
  const [valueState, setValue] = React.useState(defaultProp);
  const value = isControlled ? controlled : valueState;

  const setValueIfUncontrolled = React.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [value, setValueIfUncontrolled];
}
