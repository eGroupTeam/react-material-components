import React, { FC, useCallback, useState } from 'react';

import { Meta } from '@storybook/react';
import useTimeout from '@e-group/hooks/useTimeout';

export default {
  title: 'Hooks/useTimeout',
} as Meta;

export const Default: FC = () => {
  const [state, setState] = useState('Not called yet');
  const [isStarted, setIsStarted] = useState(false);

  function callback() {
    setState(`called at ${Date.now()}`);
  }

  const [isReady, cancel, reset] = useTimeout(
    callback,
    isStarted ? 5000 : null
  );

  const cancelButtonClick = useCallback(() => {
    if (isReady() === false) {
      cancel();
      setState(`cancelled`);
    } else {
      reset();
      setState('Not called yet');
    }
  }, [cancel, isReady, reset]);

  const readyState = isReady();

  const renderReadyState = () => {
    if (readyState === false) {
      return 'Pending';
    }
    if (readyState === true) {
      return 'Called';
    }
    return 'Cancelled';
  };
  return (
    <div>
      <div>
        {readyState !== null
          ? 'Function will be called in 5 seconds'
          : 'Timer cancelled'}
      </div>
      <button onClick={() => setIsStarted(true)} disabled={isStarted}>
        {isStarted ? 'Timeout Started' : 'Start Timeout'}
      </button>
      <br />
      <button onClick={cancelButtonClick}>
        {' '}
        {readyState === false ? 'cancel' : 'restart'} timeout
      </button>
      <br />
      <div>Function state: {renderReadyState()}</div>
      <div>{state}</div>
    </div>
  );
};
