import ApiError from './ApiError';
import None from './None';

export type Status = 'init' | 'loading' | 'loaded' | 'error';

export interface ServiceInit {
  status: 'init';
}

export interface ServiceLoading {
  status: 'loading';
}

export interface ServiceLoaded<T = any> {
  status: 'loaded';
  payload: T;
}

export interface ServiceError<E = any> {
  status: 'error';
  error: ApiError<E>;
  payload?: E;
}

export type Service<T = None, E = any> =
  | ServiceInit
  | ServiceLoading
  | ServiceLoaded<T>
  | ServiceError<E>;
