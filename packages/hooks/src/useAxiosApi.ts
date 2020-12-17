import { useCallback, useState } from 'react';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import objectCheckNull from '@e-group/utils/objectCheckNull';

export type AxiosApi = (
  payload: any,
  config?: AxiosRequestConfig
) => Promise<AxiosResponse<any>>;

export interface ApiPayload {
  [key: string]: string;
}

export default function useAxiosApi(
  api: AxiosApi,
  onrejected?: ((reason: any) => any | PromiseLike<any>) | undefined | null,
  config?: AxiosRequestConfig
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const excute = useCallback(
    <P = ApiPayload>(payload: P) => {
      if (!objectCheckNull(payload)) {
        setIsLoading(true);
        setIsError(false);
        const promise = api(payload, config);
        promise
          .then(() => {
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            setIsError(true);
            if (onrejected) {
              onrejected(error);
            }
          });
        return promise;
      }
      return Promise.reject(
        new Error('Error: Payload values include null or undefined.')
      );
    },
    [api, config, onrejected]
  );
  return {
    excute,
    isLoading,
    isError,
  };
}
