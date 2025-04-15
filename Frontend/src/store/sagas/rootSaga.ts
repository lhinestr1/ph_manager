import { all, spawn, call } from 'redux-saga/effects';
import { controlSessionSaga, loginSaga } from './session';

export default function* rootSaga() {
    const sagas = [
        controlSessionSaga,
    ];

    yield all(sagas.map(saga =>
        spawn(function* () {
            while (true) {
                try {
                    yield call(saga)
                    break
                } catch (e) {
                    console.log(e)
                }
            }
        }))
    );
}