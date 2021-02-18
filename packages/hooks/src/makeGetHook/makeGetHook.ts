import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import replacer from '@e-group/utils/replacer';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import useSWR, { ConfigInterface } from 'swr';
import { PathParams, ReturnedValues } from '../typings';

export default function makeGetHook<T = any, P = PathParams, E = any>(
  urlPattern: string,
  fetcher: AxiosInstance
) {
  return function useItem<Data = T, ErrorData = E>(
    params?: P,
    payload?: StringifiableRecord,
    config?: ConfigInterface<AxiosResponse<Data>, AxiosError<ErrorData>>
  ): ReturnedValues<Data, ErrorData> {
    const getKey = () => {
      const query = payload ? `?${queryString.stringify(payload)}` : '';
      if (params) {
        return !objectCheckNull(params)
          ? `${replacer<P>(urlPattern, params)}${query}`
          : null;
      }
      return `${urlPattern}${query}`;
    };
    const key = getKey();
    const { error, data, mutate, revalidate, isValidating } = useSWR(
      key,
      fetcher,
      config
    );

    return {
      data: data?.data,
      isError: !!error,
      mutate,
      response: data,
      error,
      key,
      revalidate,
      isValidating,
    };
  };
}
