//import { readToken } from '../helpers/tokenHelpers';
import { readToken } from '../helpers/tokenHelpers';
import { session } from '../store/reducers/sessionReducer';
import ApiError from '../types/ApiError';
import API_URL from './API_URL';

export type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

export const httpMethod = (apiUrl: string) => async (
  method: Method,
  endpoint: string,
  authentication?: boolean,
  params?: Record<string | number, any>,
  query?: boolean,
  customHeaders?: Record<string, string>
) => {
  const headers: Record<string, string> = customHeaders
    ? {}
    : {
      'X-Uuid': localStorage.getItem('user-uuid') || 'unknown',
      'X-RELEASEVER': `${(window as any).version}`,
      'Content-Type': 'application/json; charset=utf-8',
    };

  if (authentication) {
    const token = readToken().token;
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      (window as any).$store.dispatch(session.actions.logout());
    }
  }

  if (method === 'get') query = true;

  const options: RequestInit = {
    method: method.toUpperCase(),
    cache: 'no-cache',
    headers,
  };

  let endpointParsed = endpoint;
  if (query) {
    endpointParsed = Object.entries(params || []).reduce(
      (url, [key, value]) => url.replace(`:${key}`, value),
      endpoint
    );
  } else {
    options.body = JSON.stringify(params);
  }

  const response = await fetch(`${apiUrl}/${endpointParsed}`, options);

  if (response.ok) {
    try {
      let json = await response.json();
      json.code__ = response.status;
      return json;
    } catch {
      return {};
    }
  } else {
    if (response.status === 401) {
      (window as any).$store.dispatch(session.actions.logout());
    }
    let responseBody: any = {};

    try {
      responseBody = await response.json();
    } catch { }

    const error = new ApiError(endpoint, response, responseBody);
    throw error;
  }
};

export const request = httpMethod(API_URL);
