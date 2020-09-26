import React from 'react';

import { storiesOf } from '@storybook/react';
import useScrollPosition from '@e-group/hooks/useScrollPosition';

const Demo = () => {
  const [top, setTop] = React.useState(0);
  const [isShow, setIsShow] = React.useState(false);
  const elRef = React.useRef();

  useScrollPosition(({ prevPos, currPos }) => {
    const scrollDistance = prevPos.y - currPos.y;
    setTop((val) => val + scrollDistance);
  }, []);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const isShow = currPos.y > 0 && window.innerHeight - currPos.y > 0;
      setIsShow(isShow);
    },
    [],
    elRef
  );

  return (
    <div style={{ height: 2000 }}>
      <div style={{ height: 1000, position: 'relative' }}>
        <div style={{ position: 'absolute', top, transition: 'all 0.3s' }}>
          Hi!, I'm sticky.
        </div>
      </div>
      <div style={{ height: 1000 }}>
        <div
          ref={elRef}
          style={{ opacity: isShow ? 1 : 0, transition: 'all 2s' }}
        >
          Hi!, I'm fading when you scroll over me.
        </div>
      </div>
    </div>
  );
};

storiesOf('useScrollPosition', module).add('default', () => <Demo />);
