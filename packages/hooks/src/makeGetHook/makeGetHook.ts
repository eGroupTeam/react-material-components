import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import replacer from '@e-group/utils/replacer';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import useSWR, { ConfigInterface } from 'swr';
import { useCallback, useMemo } from 'react';
import { PathParams, ReturnedValues } from '../typings';

export default function makeGetHook<
  Data = any,
  P = PathParams,
  ErrorData = any
>(
  urlPattern: string,
  fetcher?: AxiosInstance,
  defaultPathParams?: P,
  defaultQueryParams?: StringifiableRecord,
  defaultConfig?: ConfigInterface<AxiosResponse<Data>, AxiosError<ErrorData>>
) {
  return function useItem(
    pathParams?: P,
    queryParams?: StringifiableRecord,
    config?: ConfigInterface<AxiosResponse<Data>, AxiosError<ErrorData>>,
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
    const getKey = useCallback(() => {
      if (disableFetch) return null;
      return !objectCheckNull(mergePathParams)
        ? `${replacer<P>(urlPattern, mergePathParams)}?${queryString.stringify(
            mergeQuery
          )}`
        : null;
    }, [disableFetch, mergePathParams, mergeQuery]);
    const key = getKey();
    const { error, data, mutate, revalidate, isValidating } = useSWR(
      key,
      fetcher,
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
