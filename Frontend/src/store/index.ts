import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { session } from './reducers/sessionReducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/rootSaga';
import { buildings } from './reducers/buildingsReducer';
import { ready } from './reducers/readyReducer';

export interface PHManagerState extends ReturnType<typeof rootReducer> {}

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    session: session.reducer,
    buildings: buildings.reducer,
    ready: ready.reducer
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga);

export default store;