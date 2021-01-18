import React, { FC } from 'react';

import axios from 'axios';
import { Meta } from '@storybook/react';
import makePostHook from '@e-group/hooks/makePostHook';
import { Card, CardContent } from '@material-ui/core';

export default {
  title: 'Utils/makePostHook',
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
  const { data } = useCreateUser(
    {
      userId: '1234',
    },
    {
      name: 'morpheus',
      job: 'leader',
    }
  );

  return (
    <>
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
