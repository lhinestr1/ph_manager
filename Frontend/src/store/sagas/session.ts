
import { call, put, takeLatest, fork, delay, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { loginPost, Result as LoginResponse, UserCredentials } from '../../services/logInPost';
import { session } from '../reducers/sessionReducer';
import { loginRequest } from '../actions/session';
import { ServiceLoaded } from '../../types/Service';
import ApiError from '../../types/ApiError';
import { ActionPromise } from '../asyncDispatch';
import { logoutFlow } from './logoutFlow';
import { tokenRemainingTimeSelector } from '../selectors/sessionSelector';
import { hydrateStoreSaga } from './hidrateSaga';
import { buildings } from '../reducers/buildingsReducer';
import { ready } from '../reducers/readyReducer';


export function* controlSessionSaga(): SagaIterator {
    const tokenRemaining = yield select(tokenRemainingTimeSelector);
    if (tokenRemaining > 0) {
        yield call(hydrateStoreSaga);
    }

    yield put(ready.actions.ready());
    yield takeLatest(loginRequest, loginSaga);
    //watcher for token expiration and logout
    yield fork(logoutFlow);
}

export function* loginSaga(action: ActionPromise<UserCredentials>): SagaIterator {
    try {
        const credentials = action.payload;
        const { payload: { token } }: ServiceLoaded<LoginResponse> = yield call(loginPost, credentials);
        yield put(session.actions.loginSuccess(token));
        //watcher for token expiration and logout
        yield fork(logoutFlow);

        //HydrateStore
        yield call(hydrateStoreSaga);
        yield put(ready.actions.ready());

        action.meta.resolve();
    } catch (e) {
        if (e instanceof ApiError) {
            yield put(session.actions.loginError(e));
            action.meta.reject(e);
        }
        action.meta.reject(new Error('Error de conexión, contacte al administrador del sistema'));
    }
}

export function* tokenExpWatcher(): SagaIterator {
    while (true) {
        const remaining = yield select(tokenRemainingTimeSelector);
        yield delay(remaining);
    }
}

export function* logout(): SagaIterator {
    yield put(session.actions.logout());
    yield put(buildings.actions.clear());
    yield put(ready.actions.notReady());
    // clear local storage or any other cleanup if needed
}