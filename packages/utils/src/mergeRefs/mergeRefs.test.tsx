import React, { FC, forwardRef, useImperativeHandle } from 'react';
import { render } from '@testing-library/react';
import mergeRefs from './mergeRefs';

test('mergeRefs', () => {
  const Dummy = forwardRef((_, ref) => {
    useImperativeHandle(ref, () => 'refValue');
    return null;
  });
  const refAsFunc = jest.fn();
  const refAsObj = { current: undefined };
  const Example: FC<{ visible: boolean }> = ({ visible }) => visible ? <Dummy ref={mergeRefs([refAsObj, refAsFunc])} /> : null;
  const { rerender } = render(<Example visible />);
  expect(refAsFunc).toHaveBeenCalledTimes(1);
  expect(refAsFunc).toHaveBeenCalledWith('refValue');
  expect(refAsObj.current).toBe('refValue');
  rerender(<Example visible={false} />);
  expect(refAsFunc).toHaveBeenCalledTimes(2);
  expect(refAsFunc).toHaveBeenCalledWith(null);
  expect(refAsObj.current).toBe(null);
});
