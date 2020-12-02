import { AxiosInstance } from 'axios';
import replacer from '@e-group/utils/replacer';
import useAxiosSWR from './useAxiosSWR';
import getShouldFetch from './utils/getShouldFetch';

export interface PathParams {
  [key: string]: string | undefined;
}

export default function makeGetHook<T = any, P = PathParams>(
  urlPattern: string,
  fetcher: AxiosInstance
) {
  return function useItem(params: P) {
    const { response, data, error, mutate } = useAxiosSWR<T>(
      getShouldFetch(params) ? replacer<P>(urlPattern, params) : null,
      fetcher
    );
    const isEmpty = response?.status === 204;

    return {
      data,
      isLoading: !error && !response,
      isEmpty,
      isError: error,
      mutate,
    };
  };
}
