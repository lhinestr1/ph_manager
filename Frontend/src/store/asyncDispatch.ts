import { ActionCreator, Action, Dispatch } from '@reduxjs/toolkit';
import { L } from 'ts-toolbelt';

export interface ActionPromise<T = any> extends Action {
  payload: T;
  meta: ActionMeta;
}

export interface ActionMeta {
  resolve(value?: any): void;
  reject(error: Error): void;
}

export type AsyncDispatch<Fn, R> = Fn extends (
  payload: infer P,
  meta: any
) => ActionPromise
  ? P extends void
    ? () => Promise<R>
    : (payload: P) => Promise<R>
  : never;

export function asyncDispatch<
  A extends Action,
  C extends ActionCreator<A> = ActionCreator<A>
>(
  dispatch: Dispatch<A>,
  actionCreator: C
): L.Head<Parameters<C>> extends void
  ? () => Promise<any>
  : (payload: L.Head<Parameters<C>>) => Promise<any>;

export function asyncDispatch<
  A extends Action,
  C extends ActionCreator<A> = ActionCreator<A>
>(dispatch: Dispatch<A>, actionCreator: C) {
  return (...args: L.Pop<Parameters<C>>) => {
    return new Promise<any>((resolve, reject) => {
      dispatch(actionCreator(args[0], { resolve, reject }));
    });
  };
}
