import React, { FC, useEffect, useState } from 'react';

import axios from 'axios';
import { Meta } from '@storybook/react';
import useAxiosApi from '@e-group/hooks/useAxiosApi';
import {
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  TextField,
} from '@material-ui/core';

export default {
  title: 'Hooks/useAxiosApi',
} as Meta;

const fetcher = axios.create({
  baseURL: 'https://reqres.in/api',
});

const fetchGetUser = ({ userId }) => fetcher.get(`/users/${userId}`);
const fetchGetUsers = () => fetcher.get(`/users`);

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

type ApiPayload = {
  userId: number;
};

export const Default: FC = () => {
  const { excute: getUsers, data: data2 } = useAxiosApi<EntityList<Data>>(
    fetchGetUsers
  );
  const { excute: getUser, data } = useAxiosApi<User, ApiPayload>(fetchGetUser);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getUsers().then((response) => {
      getUser({
        userId: response.data.data[index].id,
      });
    });
  }, [getUser, getUsers, index]);

  return (
    <>
      <TextField
        margin="normal"
        variant="outlined"
        label="Selected Index"
        type="number"
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
      />
      {data ? (
        <Card style={{ width: 240 }}>
          <CardMedia image={data.data.avatar} style={{ height: 140 }} />
          <CardContent>
            {data.data.first_name}
            {data.data.email}
          </CardContent>
        </Card>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
      <hr />
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
