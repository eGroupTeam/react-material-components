import { AxiosError, AxiosResponse } from 'axios';
import { SWRResponse } from 'swr';

export interface PathParams {
  [key: string]: string | undefined;
}

export interface ReturnedValues<Data, ErrorData> {
  data?: Data;
  mutate: SWRResponse<
    AxiosResponse<Data>,
    AxiosError<ErrorData>
  >['mutate'];
  response?: AxiosResponse<Data>;
  error?: AxiosError<ErrorData>;
  isError: boolean;
  key: string | null;
  revalidate: () => Promise<boolean>;
  isValidating: boolean;
}
