import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import objectKeysFilter from '@e-group/utils/objectKeysFilter';

export type AxiosApi = (payload: any) => Promise<AxiosResponse<any>>;
export interface ApiPayload {
  [key: string]: string;
}

export default function useAxiosApi(
  api: AxiosApi,
  onrejected?: ((reason: any) => any | PromiseLike<any>) | undefined | null
) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const excute = useCallback(
    <P = ApiPayload>(payload: P, requiredParams?: string[]) => {
      if (
        requiredParams &&
        objectCheckNull(objectKeysFilter(payload, requiredParams))
      ) {
        return Promise.reject(
          'Warning: Payload values include null or undefined.'
        );
      }
      setIsLoading(true);
      setIsError(false);
      const promise = api(payload);
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
    },
    [api, onrejected]
  );
  return {
    excute,
    isLoading,
    isError,
  };
}
