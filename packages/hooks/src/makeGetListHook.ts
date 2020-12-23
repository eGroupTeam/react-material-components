import { AxiosError, AxiosInstance } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import replacer from '@e-group/utils/replacer';
import { responseInterface } from 'swr/dist/types';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import useAxiosSWR from './useAxiosSWR';

export interface EntityList<T> {
  total: number;
  source: T[];
}
export interface PathParams {
  [key: string]: string | undefined;
}

export type UseListReturnedValues<T> = {
  data: EntityList<T> | undefined;
  isLoading: boolean;
  isEmpty: boolean;
  isError: AxiosError;
  mutate: responseInterface<any, any>['mutate'];
};

export default function makeGetListHook<T = any, P = PathParams>(
  urlPattern: string,
  fetcher: AxiosInstance
) {
  return function useList(
    params: P,
    payload?: StringifiableRecord
  ): UseListReturnedValues<T> {
    const query = payload ? `?${queryString.stringify(payload)}` : '';
    const { response, data, error, mutate } = useAxiosSWR<EntityList<T>>(
      !objectCheckNull(params)
        ? `${replacer<P>(urlPattern, params)}${query}`
        : null,
      fetcher
    );
    const isEmpty = response?.status === 204;
    const result = isEmpty
      ? {
          total: 0,
          source: [],
        }
      : data;

    return {
      data: result,
      isLoading: !error && !response,
      isEmpty,
      isError: error,
      mutate,
    };
  };
}
