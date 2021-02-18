import { useCallback } from 'react';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import replacer from '@e-group/utils/replacer';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import useSWR, { ConfigInterface } from 'swr';
import { PathParams, ReturnedValues } from '../typings';

export default function makePostHook<T = any, P = PathParams, E = any>(
  urlPattern: string,
  fetcher: AxiosInstance
) {
  return function useItem<Data = T, ErrorData = E>(
    params?: P,
    payload?: StringifiableRecord,
    query?: StringifiableRecord,
    config?: ConfigInterface<AxiosResponse<Data>, AxiosError<ErrorData>>
  ): ReturnedValues<Data, ErrorData> {
    const postFetcher = useCallback(() => {
      const postQuery = query ? `?${queryString.stringify(query)}` : '';
      if (params) {
        return fetcher.post(
          `${replacer<P>(urlPattern, params)}${postQuery}`,
          payload
        );
      }
      return fetcher.post(`${urlPattern}${postQuery}`, payload);
    }, [params, payload, query]);
    const getQueryForCache = () => {
      const mergeValues = {
        ...payload,
        ...query,
      };
      if (Object.keys(mergeValues).length > 0) {
        return queryString.stringify(mergeValues);
      }
      return '';
    };
    const getKey = () => {
      const queryForCache = getQueryForCache();
      if (params) {
        return !objectCheckNull(params)
          ? `${replacer<P>(urlPattern, params)}?${queryForCache}`
          : null;
      }
      return `${urlPattern}?${queryForCache}`;
    };
    const key = getKey();
    const { error, data, mutate, revalidate, isValidating } = useSWR(
      key,
      postFetcher,
      config
    );

    return {
      data: data?.data,
      isLoading: !error && !data,
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
