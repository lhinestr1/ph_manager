/* eslint react-hooks/exhaustive-deps: 0 */
import { useCallback, useState } from 'react';
import { Service, ServiceError, ServiceLoaded } from '../types/Service';
import ApiError from '../types/ApiError';

function useService<P, R>(
  service: () => Promise<ServiceLoaded<R>>
): [Service<R>, () => Promise<ServiceLoaded<R>>];

function useService<P, R>(
  service: (params: P) => Promise<ServiceLoaded<R>>
): [Service<R>, (params: P) => Promise<ServiceLoaded<R>>];

function useService<P, R, E>(
  service: (params: P) => Promise<ServiceLoaded<R> | ServiceError<E>>
): [Service<R, E>, (params: P) => Promise<ServiceLoaded<R> | ServiceError<E>>];

function useService<P, R, E>(service: (params: P) => Promise<any>) {
  const [state, setState] = useState<Service<R, E>>({ status: 'init' });

  const request = useCallback(
    async (params: P) => {
      try {
        setState({ status: 'loading' });
        const result = await service(params as any);

        setState(result);
        return result;
      } catch (e) {
        if(e instanceof ApiError) {
          setState({
            status: 'error',
            error: e,
            payload: e.payload,
          });
        }
        setTimeout(() => {
          setState({ status: 'init' });
        }, 3000);
        throw e;
      }
    },
    [setState]
  );

  return [state, request];
}

export default useService;
