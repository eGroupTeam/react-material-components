import { useCallback, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import getShouldFetch from './utils/getShouldFetch';

export type AxiosApi = (
  payload: any,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse<any>>;

export default function useAxiosApi(
  api: AxiosApi,
  config?: AxiosRequestConfig
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const excute = useCallback(
    (payload: any) => {
      if (getShouldFetch(payload)) {
        setIsLoading(true);
        setIsError(false);
        const promise = api(payload, config);
        promise.then(() => {
          setIsLoading(false);
        });
        return promise;
      }
      return Promise.reject(
        new Error('Error: Payload values include null or undefined.')
      );
    },
    [api, config]
  );
  return {
    excute,
    isLoading,
    isError,
  };
}
