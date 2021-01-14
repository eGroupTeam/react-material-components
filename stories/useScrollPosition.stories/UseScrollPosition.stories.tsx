import React, { FC, useRef, useState } from 'react';

import { Meta } from '@storybook/react';
import useScrollPosition from '@e-group/hooks/useScrollPosition';

export default {
  title: 'Utils/useScrollPosition',
} as Meta;

export const Default: FC = () => {
  const [top, setTop] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  useScrollPosition(({ prevPos, currPos }) => {
    const scrollDistance = prevPos.y - currPos.y;
    setTop((val) => val + scrollDistance);
  }, []);

  useScrollPosition(
    ({ currPos }) => {
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
          Hi!, Im sticky.
        </div>
      </div>
      <div style={{ height: 1000 }}>
        <div
          ref={elRef}
          style={{ opacity: isShow ? 1 : 0, transition: 'all 2s' }}
        >
          Hi!, Im fading when you scroll over me.
        </div>
      </div>
    </div>
  );
};
