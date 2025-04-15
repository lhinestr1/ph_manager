import ApiError from '../types/ApiError';
import { ServiceError, ServiceLoaded } from '../types/Service';
import { Method, request } from './api';

/*export interface ServiceMethod<Params = void, Result = void, Error = any> {
  (params: Params): Promise<ServiceLoaded<Result> | ServiceError<Error>>;
}*/

interface Options<Silent extends boolean = false | true> {
  url: string;
  auth: boolean;
  query?: boolean;
  silent?: Silent;
}

/*function serviceBuilder<Params = void, Result = void>(
  method: Method,
  options: Options<false>
): (params: Params) => Promise<ServiceLoaded<Result>>;

function serviceBuilder<Params = void, Result = void, Error = any>(
  method: Method,
  options: Options<true>
): (params: Params) => Promise<ServiceLoaded<Result> | ServiceError<Error>>;*/

function serviceBuilder<Params = Record<string | number, any>, Result = void, Error = any>(
  method: Method,
  { url, auth, silent, query }: Options
) {
  return async (params?: Params) => {
    try {
      const result: Result = await request(method, url, auth, params ?? {}, query);

      const response: ServiceLoaded<Result> = {
        status: 'loaded',
        payload: result,
      };

      return response;
    } catch (e) {
      const error: ApiError<Error> = e as ApiError<Error>;
      const response: ServiceError<Error> = {
        status: 'error',
        error,
        payload: error.payload,
      };

      if (silent) return response;

      throw error;
    }
  };
}

export default serviceBuilder;
