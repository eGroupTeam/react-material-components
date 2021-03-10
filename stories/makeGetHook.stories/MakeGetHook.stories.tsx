import React, { FC, useState } from 'react';

import axios from 'axios';
import { Meta } from '@storybook/react';
import makeGetHook from '@e-group/hooks/makeGetHook';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

export default {
  title: 'Hooks/makeGetHook',
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
const useUser = makeGetHook<User, PathParams>('/users/{{userId}}', fetcher);
const useUsers = makeGetHook<EntityList<Data>>('/users', fetcher, undefined, {
  page: 2,
});

export const Default: FC = () => {
  const [page, setPage] = useState(2);
  const { data, key } = useUsers(undefined, {
    page,
  });
  const { data: data2, key: key2 } = useUser({
    userId: data?.data[0]?.id,
  });

  return (
    <>
      <Typography>Cache Key: {key2}</Typography>
      {data2 && (
        <Card style={{ width: 240 }}>
          <CardMedia image={data2.data.avatar} style={{ height: 140 }} />
          <CardContent>
            {data2.data.first_name}
            {data2.data.email}
          </CardContent>
        </Card>
      )}
      <Typography>Cache Key: {key}</Typography>
      <Button
        onClick={() => {
          setPage((p) => (p > 0 ? p - 1 : 0));
        }}
      >
        Prev page
      </Button>
      <Button
        onClick={() => {
          setPage((p) => p + 1);
        }}
      >
        Next page
      </Button>
      {data?.data.map((el) => (
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

export const WithDisableFetch: FC = () => {
  const [disableFetch, setDisableFetch] = useState(true);
  const { data } = useUser<User>(
    {
      userId: 1,
    },
    undefined,
    undefined,
    disableFetch
  );

  return (
    <>
      <Button variant="outlined" onClick={() => setDisableFetch((v) => !v)}>
        {disableFetch ? 'enable' : 'disable'}
      </Button>
      {data && (
        <Card style={{ width: 240 }}>
          <CardMedia image={data.data.avatar} style={{ height: 140 }} />
          <CardContent>
            {data.data.first_name}
            {data.data.email}
          </CardContent>
        </Card>
      )}
    </>
  );
};
