
import { call, put, takeLatest, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { loginPost, Result as LoginResponse, UserCredentials } from '../../services/logInPost';
import { session } from '../reducers/sessionReducer';
import { loginRequest } from '../actions/session';
import { ServiceLoaded } from '../../types/Service';
import ApiError from '../../types/ApiError';
import { ActionPromise } from '../asyncDispatch';
import { logoutFlow } from './logoutFlow';


export function* controlSessionSaga(): SagaIterator {
    yield takeLatest(loginRequest, loginSaga);
    //watcher for token expiration and logout
    yield fork(logoutFlow);
}

export function* loginSaga(action: ActionPromise<UserCredentials>): SagaIterator {
    try {
        const credentials = action.payload;
        const { payload: { token } }: ServiceLoaded<LoginResponse> = yield call(loginPost, credentials);

        //watcher for token expiration and logout
        yield fork(logoutFlow);

        yield put(session.actions.loginSuccess(token));
        action.meta.resolve();
    } catch (e) {
        if (e instanceof ApiError) {
            yield put(session.actions.loginError(e));
            action.meta.reject(e);
        }
    }
}

export function* logout(): SagaIterator {
    yield put(session.actions.logout());
    // clear local storage or any other cleanup if needed
  }