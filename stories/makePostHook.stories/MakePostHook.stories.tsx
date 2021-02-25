import React, { FC } from 'react';

import axios from 'axios';
import { Meta } from '@storybook/react';
import makePostHook from '@e-group/hooks/makePostHook';
import { Card, CardContent, Typography } from '@material-ui/core';

export default {
  title: 'Hooks/makePostHook',
} as Meta;

const fetcher = axios.create({
  baseURL: 'https://reqres.in/api',
});

export interface User {
  data: Data;
  support: Support;
}

export interface Data {
  id: number;
  name: string;
  job: string;
}

export interface Support {
  url: string;
  text: string;
}
const useCreateUser = makePostHook<Data>('/users/{{userId}}', fetcher);

export const Default: FC = () => {
  const { data, key } = useCreateUser(
    {
      userId: '1234',
    },
    {
      name: 'morpheus',
      job: 'leader',
      userList: [
        {
          name: 'leo',
          job: 'chief',
        },
        {
          name: 'amy',
          job: 'director',
          date: new Date('1990-01-01'),
        },
      ],
    },
    {
      query: 'test',
    }
  );

  return (
    <>
      <Typography color="secondary">
        Warning: We should never use not idempotent actions for useSwr so the
        demo here is anti-pattern design and should be avoid to use.
        <br />
        Reference Issues:
        <br />
        1. https://stackoverflow.com/a/612035/8105942
        <br />
        2. https://github.com/vercel/swr/issues/93
        <br />
        The demo here is only to show that post method is possible when use swr
        but we should never use swr for not idempotent actions.
      </Typography>
      <Typography>Cache Key: {key}</Typography>
      {data && (
        <Card style={{ width: 240 }}>
          <CardContent>
            {data.name}
            <br />
            {data.job}
          </CardContent>
        </Card>
      )}
    </>
  );
};
