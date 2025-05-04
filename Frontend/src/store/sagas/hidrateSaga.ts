import { SagaIterator } from "redux-saga";
import { all, call, put } from "redux-saga/effects";
import buildingGet, { Response } from "../../services/buildingGet";
import { buildings } from "../reducers/buildingsReducer"
import { ServiceLoaded } from "../../types/Service";


export function* hydrateStoreSaga(): SagaIterator {
    const [buildingsData]: [ServiceLoaded<Response>] = yield all([
      call(buildingGet),
    ]);
  
    yield put(buildings.actions.updateBuildings(buildingsData.payload.items));
  }