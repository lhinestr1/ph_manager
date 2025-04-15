import { SagaIterator } from 'redux-saga';
import { call, take, race } from 'redux-saga/effects';
import { logoutRequest } from '../actions/session';
import { logout } from './session';

export function* logoutFlow(): SagaIterator {
  try {
    //yield race([call(tokenExpWatcher), take(logoutRequest)]);
    yield race([take(logoutRequest)]) ;
  } finally {
    yield call(logout);
  }
}
