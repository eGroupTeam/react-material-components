import { AxiosInstance } from 'axios';
import queryString from 'query-string';
import replacer from '@e-group/utils/replacer';
import useAxiosSWR from './useAxiosSWR';
import getShouldFetch from './utils/getShouldFetch';

export interface EntityList<T> {
  total: number;
  source: T[];
}
export interface QueryPayload {
  [key: string]: string;
}

export interface PathParams {
  [key: string]: string | undefined;
}

export default function makeGetListHook<T = any, P = PathParams>(
  urlPattern: string,
  fetcher: AxiosInstance
) {
  return function useList(params: P, payload?: QueryPayload) {
    const query = payload ? queryString.stringify(payload) : '';
    const { response, data, error, mutate } = useAxiosSWR<EntityList<T>>(
      getShouldFetch(params)
        ? `${replacer<P>(urlPattern, params)}?${query}`
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
