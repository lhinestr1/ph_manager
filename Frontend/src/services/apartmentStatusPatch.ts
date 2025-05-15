import { IApartment } from '../types/common';
import serviceBuilder from './serviceBuilder';

export interface Params {
  params: {
    apartment_id: string;
  }
  payload: {
    isInArrears?: boolean;
    ownerId?: string;
    buildingId?: string;
  }
}

export default ({ apartment_id }: Params["params"]) => {
    const url = `apartments/${apartment_id}`;
    return serviceBuilder<Params["payload"], IApartment>('patch', {
        url,
        auth: true,
    });
}
