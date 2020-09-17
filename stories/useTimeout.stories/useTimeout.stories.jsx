import React from 'react';

import { storiesOf } from '@storybook/react';
import useTimeout from '@e-group/hooks/useTimeout';

const Demo = () => {
  const [state, setState] = React.useState('Not called yet');

  function fn() {
    setState(`called at ${Date.now()}`);
  }

  const [isReady, cancel, reset] = useTimeout(fn, 5000);

  const cancelButtonClick = React.useCallback(() => {
    if (isReady() === false) {
      cancel();
      setState(`cancelled`);
    } else {
      reset();
      setState('Not called yet');
    }
  }, [cancel, isReady, reset]);

  const readyState = isReady();

  return (
    <div>
      <div>
        {readyState !== null
          ? 'Function will be called in 5 seconds'
          : 'Timer cancelled'}
      </div>
      <button onClick={cancelButtonClick}>
        {' '}
        {readyState === false ? 'cancel' : 'restart'} timeout
      </button>
      <br />
      <div>
        Function state:{' '}
        {readyState === false ? 'Pending' : readyState ? 'Called' : 'Cancelled'}
      </div>
      <div>{state}</div>
    </div>
  );
};

storiesOf('useTimeout', module).add('default', () => <Demo />);
