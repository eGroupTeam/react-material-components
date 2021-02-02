import { useCallback, useState } from 'react';
import { AxiosError, AxiosPromise, AxiosResponse } from 'axios';
import objectCheckNull from '@e-group/utils/objectCheckNull';
import objectKeysFilter from '@e-group/utils/objectKeysFilter';

export type AxiosApi<Data> = (payload: any) => AxiosPromise<Data>;
export interface ApiPayload {
  [key: string]: string;
}

export default function useAxiosApi<
  Data = any,
  P = ApiPayload,
  ErrorData = any
>(api: AxiosApi<Data>, onrejected?: (error: AxiosError<ErrorData>) => void) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<Data>();
  const [response, setResponse] = useState<AxiosResponse<Data>>();
  const [error, setError] = useState<AxiosError<ErrorData>>();
  const excute = useCallback(
    (payload?: P, requiredParams?: string[]) => {
      if (
        requiredParams &&
        objectCheckNull(objectKeysFilter(payload, requiredParams))
      ) {
        return Promise.reject(
          new Error('Warning: Payload values include null or undefined.')
        );
      }
      setIsLoading(true);
      setIsError(false);
      setData(undefined);
      setResponse(undefined);
      setError(undefined);
      const promise = api(payload);
      promise
        .then((response) => {
          setIsLoading(false);
          setData(response.data);
          setResponse(response);
        })
        .catch((error: AxiosError<ErrorData>) => {
          setIsLoading(false);
          setIsError(true);
          setError(error);
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
    data,
    response,
    error,
  };
}
