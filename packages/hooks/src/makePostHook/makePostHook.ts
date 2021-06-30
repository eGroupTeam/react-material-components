import { useCallback, useMemo } from 'react';
import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import replacer from '@e-group/utils/replacer';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import useSWR, { SWRConfiguration } from 'swr';
import { PathParams, ReturnedValues } from '../typings';

export default function makePostHook<
  Data = any,
  P = PathParams,
  ErrorData = any
>(
  urlPattern: string,
  fetcher: AxiosInstance,
  defaultPathParams?: P,
  defaultBody?: any,
  defaultQueryParams?: StringifiableRecord,
  defaultConfig?: SWRConfiguration<AxiosResponse<Data>, AxiosError<ErrorData>>
) {
  return function useItem(
    pathParams?: P,
    body?: any,
    queryParams?: StringifiableRecord,
    config?: SWRConfiguration<AxiosResponse<Data>, AxiosError<ErrorData>>,
    disableFetch?: boolean
  ): ReturnedValues<Data, ErrorData> {
    const mergePathParams = useMemo(
      () =>
        ({
          ...defaultPathParams,
          ...pathParams,
        } as P),
      [pathParams]
    );
    const mergeQuery = useMemo(
      () =>
        ({
          ...defaultQueryParams,
          ...queryParams,
        } as StringifiableRecord),
      [queryParams]
    );
    const postFetcher = useCallback(() => fetcher.post(
        `${replacer<P>(urlPattern, mergePathParams)}?${queryString.stringify(
          mergeQuery
        )}`,
        {
          ...defaultBody,
          ...body,
        }
      ), [mergePathParams, mergeQuery, body]);
    const getKey = useCallback(() => {
      if (disableFetch) return null;
      const cacheKey = queryString.stringify({
        payload: JSON.stringify(body),
        ...mergeQuery,
      });
      return !objectCheckNull(mergePathParams)
        ? `${replacer<P>(urlPattern, mergePathParams)}?${cacheKey}`
        : null;
    }, [body, disableFetch, mergePathParams, mergeQuery]);
    const key = getKey();
    const { error, data, mutate, revalidate, isValidating } = useSWR(
      key,
      postFetcher,
      {
        ...defaultConfig,
        ...config,
      }
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
