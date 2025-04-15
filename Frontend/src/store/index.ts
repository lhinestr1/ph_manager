import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { session } from './reducers/sessionReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';

export interface PHManagerState extends ReturnType<typeof rootReducer> {}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    session: session.reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store;