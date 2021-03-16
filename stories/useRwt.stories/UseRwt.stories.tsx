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
        xs: 'Extra Small devices.',
        sm: 'Small devices.',
        md: 'Middle devices.',
        lg: 'Large devices.',
        xl: 'Extra Large devices.',
      },
      subTitle: 'sub title',
      price: {
        xs: 10,
        sm: 120,
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
      <br />
      {rwt(msg?.home.main.subTitle)}
      <br />
      {rwt(msg?.home.main.price)}
    </>
  );
};
