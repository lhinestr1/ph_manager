import { createAction } from '@reduxjs/toolkit';
import { UserCredentials } from '../../services/logInPost';
import { ActionMeta } from '../asyncDispatch';

export const loginRequest = createAction(
  'session/login-request',
  (payload: UserCredentials, meta: ActionMeta) => ({ payload, meta })
);

export const logoutRequest = createAction('session/logout-request');
