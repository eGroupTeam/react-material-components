import { useCallback, useMemo } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import queryString, { StringifiableRecord } from 'query-string';
import replacer from '@e-group/utils/replacer';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import useSWR, { SWRConfiguration } from 'swr';
import { Fetcher } from 'swr/dist/types';
import { PathParams, ReturnedValues } from '../typings';

export default function makeGetHook<
  Data = unknown,
  P = PathParams,
  ErrorData = unknown
>(
  urlPattern: string,
  fetcherArg?: Fetcher<AxiosResponse<Data>>,
  defaultPathParams?: P,
  defaultQueryParams?: StringifiableRecord,
  defaultConfig?: SWRConfiguration<AxiosResponse<Data>, AxiosError<ErrorData>>
) {
  return function useItem(
    pathParams?: P,
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
    const getKey = useCallback(() => {
      if (disableFetch) return null;
      return !objectCheckNull(mergePathParams)
        ? `${replacer<P>(urlPattern, mergePathParams)}?${queryString.stringify(
            mergeQuery
          )}`
        : null;
    }, [disableFetch, mergePathParams, mergeQuery]);
    const key = getKey();
    const fetcher = fetcherArg === undefined ? null : fetcherArg;
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
