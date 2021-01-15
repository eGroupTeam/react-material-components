import React, { FC } from 'react';

import axios from 'axios';
import { Meta } from '@storybook/react';
import makeGetHook from '@e-group/hooks/makeGetHook';
import { Card, CardContent, CardMedia } from '@material-ui/core';

export default {
  title: 'Utils/makeGetHook',
} as Meta;

const fetcher = axios.create({
  baseURL: 'https://reqres.in/api',
});

export interface EntityList<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface User {
  data: Data;
  support: Support;
}

export interface Data {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface Support {
  url: string;
  text: string;
}

type PathParams = {
  userId?: number;
};
const useUser = makeGetHook<unknown, PathParams>('/users/{{userId}}', fetcher);
const useUsers = makeGetHook<EntityList<Data>>('/users', fetcher);

export const Default: FC = () => {
  const { data: data2 } = useUsers(undefined, {
    page: 2,
  });
  const { data } = useUser<User>({
    userId: data2?.data[0].id,
  });

  return (
    <>
      {data && (
        <Card style={{ width: 240 }}>
          <CardMedia image={data.data.avatar} style={{ height: 140 }} />
          <CardContent>
            {data.data.first_name}
            {data.data.email}
          </CardContent>
        </Card>
      )}
      {data2?.data.map((el) => (
        <Card style={{ width: 240 }} key={el.id}>
          <CardMedia image={el.avatar} style={{ height: 140 }} />
          <CardContent>
            {el.first_name}
            {el.email}
          </CardContent>
        </Card>
      ))}
    </>
  );
};
