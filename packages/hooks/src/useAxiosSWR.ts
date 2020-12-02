import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import useSWR, { keyInterface, ConfigInterface } from 'swr';
import { fetcherFn } from 'swr/dist/types';

const useAxiosSWR = <R>(
  key: keyInterface,
  fn?: AxiosInstance | fetcherFn<any>,
  config?: ConfigInterface
) => {
  const swrResponse = useSWR(key, fn, config);
  const response: AxiosResponse<R> | undefined = swrResponse.data;
  const data = response?.data;

  return {
    ...swrResponse,
    error: swrResponse.error as AxiosError,
    response,
    data,
  };
};

export default useAxiosSWR;
