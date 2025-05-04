import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export interface TokenAttrs {
  role: string;
  valid: boolean;
  exp: number;
  full_name: string;
  token: string;
}

export function removeToken() {
  return saveToken('');
}

export function saveToken(token: string = '') {
  if (isTokenValid(token)) {
    if (sessionStorage) {
      sessionStorage.setItem('token', token);
    } else {
      Cookies.set('token', token);
    }
  } else {
    if (sessionStorage) {
      sessionStorage.setItem('token', '');
    } else {
      Cookies.remove('token');
    }
  }

  const attrs = readToken();
  return attrs;
}

export function isTokenValid(token: string) {
  try {
    const { exp } = jwtDecode(token) as TokenAttrs;
    if (Date.now() < exp * 1000) {
      return true;
    }
  } catch {}

  return false;
}

//milliseconds
export function remainingExpTime(exp: number) {
  return Math.max(0, exp * 1000 - Date.now());
}

export function readToken() {

  let token: string;
  if (sessionStorage) {
    token = sessionStorage.getItem('token') || '';
  } else {
    token = Cookies.get('token') ?? '';
  }
  

  if (isTokenValid(token)) {
    const attrs = jwtDecode(token) as TokenAttrs;

    return { ...attrs, token, valid: true };
  }

  return { ...emptyTokenAttrs };
}

export const emptyTokenAttrs: TokenAttrs = {
  role: '',
  exp: 0,
  valid: false,
  full_name: '',
  token: ''
};
