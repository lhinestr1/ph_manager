/* eslint react-hooks/exhaustive-deps: 0 */
import serviceBuilder from './serviceBuilder';

export interface UserCredentials {
  email: string;
  password: string;
}

export interface Result {
  token: string;
}

const url = 'auth/login';

export const loginPost = serviceBuilder<UserCredentials, Result>('post', {
  url,
  auth: false,
});
