import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import replacer from '@e-group/utils/replacer';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import { responseInterface } from 'swr';
import useAxiosSWR from './useAxiosSWR';

export interface PathParams {
  [key: string]: string | undefined;
}

export interface ReturnedValues<Data> {
  data?: Data;
  mutate: responseInterface<any, any>['mutate'];
  response?: AxiosResponse<Data>;
  error?: AxiosError;
  isLoading: boolean;
  isError: boolean;
}

export type UseItem<T, P> = <Data = T>(
  params?: P,
  payload?: StringifiableRecord
) => ReturnedValues<Data>;

export default function makeGetHook<T = any, P = PathParams>(
  urlPattern: string,
  fetcher: AxiosInstance
) {
  return function useItem<Data = T>(
    params?: P,
    payload?: StringifiableRecord
  ): ReturnedValues<Data> {
    const query = payload ? `?${queryString.stringify(payload)}` : '';
    const getKey = () => {
      if (params) {
        return !objectCheckNull(params)
          ? `${replacer<P>(urlPattern, params)}${query}`
          : null;
      }
      return `${urlPattern}${query}`;
    };
    const { response, data, error, mutate } = useAxiosSWR<Data>(
      getKey(),
      fetcher
    );

    return {
      data,
      isLoading: !error && !response,
      isError: !!error,
      mutate,
      response,
      error,
    };
  };
}
