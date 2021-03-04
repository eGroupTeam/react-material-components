import React, { FC, useEffect, useState } from 'react';

import { Meta } from '@storybook/react';
import useRwt from '@e-group/hooks/useRwt';

export default {
  title: 'Hooks/useRwt',
} as Meta;

const intlMessage = {
  home: {
    main: {
      title: {
        defaultValue: 'Default message',
        xs: 'Extra Small devices.',
        sm: 'Small devices.',
        md: 'Middle devices.',
        lg: 'Large devices.',
        xl: 'Extra Large devices.',
      },
      subTitle: 'sub title',
      price: {
        defaultValue: 120,
        sm: 10,
      },
    },
  },
};

export const Default: FC = () => {
  const rwt = useRwt();
  const [msg, setMsg] = useState<typeof intlMessage>();

  useEffect(() => {
    setMsg(intlMessage);
  }, []);

  return (
    <>
      {rwt(msg?.home.main.title)}
      {rwt(msg?.home.main.subTitle)}
      {rwt(msg?.home.main.price)}
    </>
  );
};
